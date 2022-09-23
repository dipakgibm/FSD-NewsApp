package com.newspp.FSDProject.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "bookmarks")
public class Bookmarks {
    @Id
    @GeneratedValue
    private int bookmarkId;
    private String userName;
    private String title;
    private String newsUrl;
    private String imageUrl;
    private String source;
    private String date;

    private String description;
    private String author;

    public Bookmarks() {
        super();
    }

    public Bookmarks(int bookmarkId, String userName, String title, String newsUrl, String imageUrl, String source, String date, String description, String author) {
        this.bookmarkId = bookmarkId;
        this.userName = userName;
        this.title = title;
        this.newsUrl = newsUrl;
        this.imageUrl = imageUrl;
        this.source = source;
        this.date = date;
        this.description = description;
        this.author = author;
    }

    public int getBookmarkId() {
        return bookmarkId;
    }

    public void setBookmarkId(int bookmarkId) {
        this.bookmarkId = bookmarkId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getNewsUrl() {
        return newsUrl;
    }

    public void setNewsUrl(String newsUrl) {
        this.newsUrl = newsUrl;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }
}