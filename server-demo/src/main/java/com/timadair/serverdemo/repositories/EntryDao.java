package com.timadair.serverdemo.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class EntryDao {

  private final JdbcTemplate jdbcTemplate;

  @Autowired
  public EntryDao(JdbcTemplate jdbcTemplate) {
    this.jdbcTemplate = jdbcTemplate;
  }

  public String getById(int id) {
    return jdbcTemplate.queryForObject("SELECT entry_text FROM entries where id=?", new Object[]{id}, String.class);
  }
}
