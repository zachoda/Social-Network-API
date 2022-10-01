const express = require('express');
const mongoose = require('mongoose');

const app = require('express');
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(require('./Routes'));

mongoose.set('debug', true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));