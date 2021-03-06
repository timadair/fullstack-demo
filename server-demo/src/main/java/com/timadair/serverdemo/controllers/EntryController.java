package com.timadair.serverdemo.controllers;

import com.timadair.serverdemo.repositories.Entry;
import com.timadair.serverdemo.repositories.EntryRepository;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

/** @noinspection unused*/
@RestController
@CrossOrigin
@Api(tags = "Entry Controller", produces = MediaType.APPLICATION_JSON_VALUE)
public class EntryController {

  private EntryRepository entryRepository;

  @Autowired
  public EntryController(EntryRepository entryRepository) {
    this.entryRepository = entryRepository;
  }

  @GetMapping(path = "/entries/{id}")
  public Entry getEntry(@PathVariable long id) {
    return entryRepository.findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No entity found for " + id));
  }

  @GetMapping(path = "/entries/")
  public Iterable<Entry> getEntries() {
    return entryRepository.findAll();
  }

  @PostMapping(path = "/entries/")
  public Entry createEntry(@RequestBody Entry entry) {
    if (entry.getId() != null) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The Entry ID will be generated by the database");
    }
    return entryRepository.save(entry);
  }

  @DeleteMapping(path = "/entries/{id}")
  public void deleteEntry(@PathVariable long id) {
    entryRepository.deleteById(id);
  }
}
