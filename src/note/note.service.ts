import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from 'src/dtos/create-note.dto';
import { Note } from './note.model';
import {v4 as uuidv4} from 'uuid';
import { takeLast } from 'rxjs';
@Injectable()
export class NoteService {
    private notes: Note[] = [];

   getNotes(): Note[]{
    return this.notes;
   } 

   getNote(id: string): Note{
    const note = this.notes.find(note => note.id == id);
    if(!note){
        throw new NotFoundException();
    }
    return note;
   }

   createNote(note: CreateNoteDto): Note{
    const {note_title, description} = note;

    const newNote: Note ={
        id: uuidv4(),
        note_title,
        description
    }
    this.notes.push(newNote);
    return newNote;
   }

   deleteNote(id: string): void{
    const result = this.getNote(id);
    this.notes = this.notes.filter(note => note.id !== result.id);
   }

   updateNote(id: string, note_title: string, description: string): Note{
    const note = this.getNote(id);
    note.note_title= note_title;
    note.description = description;
    return note;
   }
}
