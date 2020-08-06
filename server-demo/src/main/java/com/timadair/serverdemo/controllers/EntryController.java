package com.timadair.serverdemo.controllers;

import com.timadair.serverdemo.repositories.EntryDao;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@Api(tags = "Entry Controller", produces = MediaType.APPLICATION_JSON_VALUE)
public class EntryController {

  private EntryDao entryDao;

  @Autowired
  public EntryController(EntryDao entryDao) {
    this.entryDao = entryDao;
  }

  @CrossOrigin
  @GetMapping(path = "/entries/{id}")
  public String getEntry(@PathVariable int id) {
    // TODO replace this, include entry ID.
    return "{\"entries\": [\"" + entryDao.getById(id) + "\"]}";
  }
}
