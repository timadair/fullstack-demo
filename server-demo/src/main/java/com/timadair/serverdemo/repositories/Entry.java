package com.timadair.serverdemo.repositories;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Entry {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String entryText;

  public Entry() {
  }

  public Entry(Long id, String entryText) {
    this.id = id;
    this.entryText = entryText;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getEntryText() {
    return entryText;
  }

  public void setEntryText(String entryText) {
    this.entryText = entryText;
  }
}
