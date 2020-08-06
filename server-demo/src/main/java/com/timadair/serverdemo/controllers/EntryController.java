package com.timadair.serverdemo.controllers;

import io.swagger.annotations.Api;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Api(tags = "Entry Controller", produces = MediaType.APPLICATION_JSON_VALUE)
public class EntryController {

  @GetMapping(path = "/entries")
  public String getEntry(@RequestParam int id) {
    return "test";
  }
}
