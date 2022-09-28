package com.newspp.FSDProject.bookmarkservice;

import com.newspp.FSDProject.exception.BookmarkExistsException;
import com.newspp.FSDProject.exception.BookmarksNotFoundException;
import com.newspp.FSDProject.models.Bookmarks;

import java.util.List;

public interface BookmarkService {

    public boolean addBookmark(Bookmarks bookmark) throws BookmarkExistsException;

    public List<Bookmarks> getAllBookmarks();


    public List<Bookmarks> getAllBookmarksByUser(String userName) throws BookmarksNotFoundException;



}