const express = require('express');
const router = express.Router();

const Note = require('../models/Note');

router.get('/notes/add', (req,res) => {
  res.render('notes/new-note');
});

router.post('/notes/new-note', async (req, res) => {
  const { title, description } = req.body;
  const errors = [];
  if(!title) {
    errors.push({text: 'Por favor Escriba un Titulo'});
  }
  if(!description) {
    errors.push({text: 'Por favor Escriba una Descripcion'});
  }
  if(errors.length > 0) {
    res.render('notes/new-note',{
      errors,
      title,
      description
    });
  }else {
    const newNote = new Note({ title, description });
    //newNote.user = req.user.id;
    await newNote.save();
    req.flash('success_msg', 'Nota Agregada con Exito ');
    res.redirect('/notes');
    //console.log(newNote);
    //res.send('ok');
  }
});

router.get('/notes', async (req, res) => {
  const notes = await Note.find().sort({date: 'desc'});
  res.render('notes/all-notes', { notes });
});

router.get('/notes/edit/:id', async (req, res) => {
  const note = await Note.findById(req,params.id);
  res.render('notes/edit-note', {note});
});

router.put('/notes/edit-note/:id', async (req, res) => {
  const { title, description }= req.body;
  await Note.findByIdAndUpdate(req.params.id, {title, description});
  req.flash('success_msg', 'Nota Actualisada con Exito');
  res.redirect('/notes');
});

router.delete('/notes/delete/:id', async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'Nota Borrada con Exito');
  res.redirect('/notes');
});

module.exports = router; 




//import { Router } from "express";
//import {
//  renderNoteForm,
//  createNewNote,
//  renderNotes,
//  renderEditForm,
//  updateNote,
//  deleteNote,
//} from "../controllers/notes.controller";
//import { isAuthenticated } from "../helpers/auth";

//const router = Router();

// New Note
//router.get("/notes/add", isAuthenticated, renderNoteForm);

//router.post("/notes/new-note", isAuthenticated, createNewNote);

// Get All Notes
//router.get("/notes", isAuthenticated, renderNotes);

// Edit Notes
//router.get("/notes/edit/:id", isAuthenticated, renderEditForm);

//router.put("/notes/edit-note/:id", isAuthenticated, updateNote);

// Delete Notes
//router.delete("/notes/delete/:id", isAuthenticated, deleteNote);

//export default router;
