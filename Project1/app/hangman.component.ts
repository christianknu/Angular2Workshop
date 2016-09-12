import {Component, OnInit, OnChanges, Input, SimpleChange} from '@angular/core';
import { WordService } from './word.service';
import {Observable} from "rxjs/Observable";

enum gameState { 
    Waiting, 
    Playing, 
    Lost, 
    Won };
    
const TotalMoves = 6;

@Component({
    selector: 'my-hangman',
    template: `
    <h3>Let's play {{title}}</h3>
	<div class="container bongo">
        <div *ngIf="currentGameState!=1">
            <button  class="btn btn-lg btn-primary btn-block" (click)="startGame()" type="submit">Play</button>
        </div>
        <div *ngIf="currentGameState === 1" class="smallpadd">
            <img [ngClass]="{'animate':shouldAnimate}" [src]="hangURL">
            
            <span>Word: </span>
            <span>{{displayWord}} </span><br /><br />

            <button (click)="makeMove(letter)" [disabled]="hasBeenUsed(letter)" *ngFor="let letter of validLetters">{{letter}}</button>
        </div>
        <div *ngIf="currentGameState === 2" class="smallpadd">Sorry, you lost...</div>
        <div *ngIf="currentGameState === 3" class="smallpadd">Congratz, you won!!</div>
    </div>
  `,
    styles: [
        `
        .bongo { padding:200px;}
        .smallpadd {padding:20px;}
        :disabled {background-color:#aaaaaa;}

  `],
    providers: [WordService]
})



export class HangmanComponent implements OnInit, OnChanges {

    public title = 'Hangman';
    validLetters: Array<string> = 'abcdefghijklmnopqrstuvwxyz'.split('');
    correctLetters: Array<string>;
    incorrectLetters: Array<string>;
    currentWord: Array<string>;

    @Input('nrOfMoves') nrOfMoves: number;

    currentGameState: gameState;
    uniqueLetterCount:number;
    displayWord: string;
    hangURL: string;

    constructor(private wordService: WordService) { }

    ngOnInit() {
        this.currentGameState = gameState.Waiting;
        this.correctLetters = new Array<string>();
        this.incorrectLetters = new Array<string>();
    }

    ngOnChanges(changes: {[propName: string]: SimpleChange}) {
        console.log(changes['nrOfMoves']);
    }

    letterCorrect(letter: string): boolean {
        return this.currentWord.indexOf(letter) != -1;
    }
    hasBeenUsed(letter: string): boolean {
        return this.correctLetters.indexOf(letter) != -1 || this.incorrectLetters.indexOf(letter) != -1;
    }

    startGame() {
        this.currentGameState = gameState.Playing;
        this.nrOfMoves = TotalMoves;
        
        this.correctLetters = new Array<string>();
        this.incorrectLetters = new Array<string>();

        this.currentWord = this.wordService.getUnusedWord().split('');
        this.uniqueLetterCount = new Set(this.currentWord).size;
        this.displayWord = this.generateWord();
        this.theHangMan();
    }

    makeMove(letter: string) {
        //player has chosen a letter. What to do?
        if(!this.hasBeenUsed(letter)) {
            if(this.letterCorrect(letter)) {
                this.correctLetters.push(letter);
            } else {
                this.incorrectLetters.push(letter);
                this.nrOfMoves--;
            } 
        } else {
            alert("WTF!? The letter has already been used, mate.");
        }
        this.displayWord = this.generateWord();
        this.theHangMan();
        //And after that  
        this.validateGame();
    }

    validateGame() {
        // it aint over till its game over
       	if(this.nrOfMoves == 0) this.currentGameState = 2;
        
        if(this.correctLetters.length === this.uniqueLetterCount) this.currentGameState = 3;
    }
    

    countUniqueCharacters(s: string) {
        let countOfUniqueChars = s.length;
        for (let i = 0; i < s.length; i++) {
            if (i != s.indexOf(s[i])) {
                countOfUniqueChars--;
            }
        }
        return countOfUniqueChars;
    }

    generateWord(): string {
        let retWord: string = "";
        this.currentWord.forEach(letter => {
            if(this.correctLetters.includes(letter)) retWord = retWord + letter;
            else retWord = retWord + " _ ";
        });
        return retWord;
    }

    theHangMan() {
        switch (this.nrOfMoves) {
            case 6: 
                this.hangURL="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Hangman-0.png/60px-Hangman-0.png";
                break;
            case 5: 
                this.hangURL="https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Hangman-1.png/60px-Hangman-1.png";
                break;
            case 4: 
                this.hangURL="https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Hangman-2.png/60px-Hangman-2.png";
                break;
            case 3: 
                this.hangURL="https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Hangman-3.png/60px-Hangman-3.png";
                break;
            case 2: 
                this.hangURL="https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Hangman-4.png/60px-Hangman-4.png";
                break;
            case 1: 
                this.hangURL="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Hangman-5.png/60px-Hangman-5.png";
                break;
            case 0: 
                this.hangURL="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Hangman-6.png/60px-Hangman-6.png";
                break;
            default:
                break;
        }
    }
}

