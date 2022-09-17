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
    private String url;
    private String urlToImage;
    private String sourceName;
    private String publishedAt;

    private String description;
    private String author;

    public Bookmarks() {
        super();
    }

    public Bookmarks(int bookmarkId, String userName, String title, String url, String urlToImage, String sourceName,
                     String publishedAt,String description,String author) {
        super();
        this.bookmarkId = bookmarkId;
        this.userName = userName;
        this.title = title;
        this.url = url;
        this.urlToImage = urlToImage;
        this.sourceName = sourceName;
        this.publishedAt = publishedAt;
        this.description=description;
        this.author=author;
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

    public int getBookmarkId() {
        return bookmarkId;
    }

    public void setBookmarkId(int bookmarkId) {
        this.bookmarkId = bookmarkId;
    }

    public String getuserName() {
        return userName;
    }

    public void setuserName(String userName) {
        this.userName = userName;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getUrlToImage() {
        return urlToImage;
    }

    public void setUrlToImage(String urlToImage) {
        this.urlToImage = urlToImage;
    }

    public String getSourceName() {
        return sourceName;
    }

    public void setSourceName(String sourceName) {
        this.sourceName = sourceName;
    }

    public String getPublishedAt() {
        return publishedAt;
    }

    public void setPublishedAt(String publishedAt) {
        this.publishedAt = publishedAt;
    }
}