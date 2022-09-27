package com.newspp.FSDProject.bookmarkservice;


import com.newspp.FSDProject.models.Bookmarks;
import com.newspp.FSDProject.repository.BookmarkDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookmarkServiceImpl implements BookmarkService {

    @Autowired
    private BookmarkDAO bookmarkDAO;


    String collectionName = "bookmarks";

    @Override
    public boolean addBookmark(Bookmarks bookmark) {
        Bookmarks bObj = bookmarkDAO.save(bookmark);
        return true;

    }

    @Override
    public List<Bookmarks> getAllBookmarks() {
        List<Bookmarks> bookmarksList = bookmarkDAO.findAll();
        if(bookmarksList.isEmpty()) {
            return bookmarksList;
        }
        else {
            return null;
        }
    }

    @Override
    public List<Bookmarks> getAllBookmarksByUser(String username) {
        try {
            return bookmarkDAO.findByUserName(username);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public boolean deleteBookmark(int bookmarkId) {
        if(bookmarkDAO.deleteByBookmarkId(bookmarkId) != null) {
            return true;
        }
        else {
            return false;
        }
    }

    @Override
    public List<Bookmarks> searchBookmarkByDescription(String description, String username) {
        return bookmarkDAO.findByDescriptionAndUserName(description, username);
    }

    @Override
    public List<Bookmarks> searchBookmarkBySource(String source, String username) {
        return bookmarkDAO.findBySourceAndUserName(source,username);
    }

}