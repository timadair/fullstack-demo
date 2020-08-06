package com.timadair.serverdemo.controllers;

import com.timadair.serverdemo.repositories.EntryDao;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Api(tags = "Entry Controller", produces = MediaType.APPLICATION_JSON_VALUE)
public class EntryController {

  private EntryDao entryDao;

  @Autowired
  public EntryController(EntryDao entryDao) {
    this.entryDao = entryDao;
  }

  @GetMapping(path = "/entries/{id}")
  public String getEntry(@RequestParam int id) {
    return entryDao.getById(id);
  }
}
