package com.newspp.FSDProject.controllers;

import com.newspp.FSDProject.exception.BookmarkExistsException;
import com.newspp.FSDProject.exception.BookmarksNotFoundException;
import com.newspp.FSDProject.models.Bookmarks;
import com.newspp.FSDProject.service.BookmarkService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/articles/bookmarks")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class BookmarksController {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private BookmarkService bookmarkService;

    @PostMapping("/addtobookmarks")
    public ResponseEntity<String> addToBookmarks(@RequestBody Bookmarks bookmark)
            throws IOException, BookmarkExistsException, BookmarksNotFoundException {
        List<Bookmarks> list = null;
        int bookmarkId = 0;
        try {
            list = bookmarkService.getAllBookmarks();
            bookmarkId = list.size();
            bookmarkId++;
            bookmark.setBookmarkId(bookmarkId);
        }
        catch (NullPointerException e) {
            bookmark.setBookmarkId(1);
        }

        List<Bookmarks> bList = bookmarkService.getBookmarkByTitle(bookmark.getTitle(), bookmark.getuserName());

        if (bList.isEmpty()) {
            if (bookmarkService.addBookmark(bookmark)) {
                return new ResponseEntity<>("Created", HttpStatus.CREATED);
            } else {
                return new ResponseEntity<>("Conflict", HttpStatus.CONFLICT);
            }
        } else {
            return new ResponseEntity<>("Conflict", HttpStatus.CONFLICT);
        }
    }

    /*
     * @GetMapping("/getbookmarks") public ResponseEntity<List<Bookmarks>>
     * getBookmarks() { List<Bookmarks> bookmarkList =
     * bookmarkService.getAllBookmarks(); System.out.println("Get bookmarks: " +
     * bookmarkList); return new ResponseEntity<List<Bookmarks>>(bookmarkList,
     * HttpStatus.OK); }
     */
    @GetMapping("/getuserbookmarks")
    public ResponseEntity<List<Bookmarks>> getBookmarksByUser(@RequestParam("username") String username) {
        logger.info("Getting bookmarks for user");
        try {
            List<Bookmarks> bookmarkList = bookmarkService.getAllBookmarksByUser(username);

            return new ResponseEntity<>(bookmarkList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>( HttpStatus.CONFLICT);

        }
    }

    @DeleteMapping("/deletebookmark")
    public ResponseEntity<Boolean> deleteBookmark(@RequestParam("bookmarkId") Integer bookmarkId) {
        try {
            bookmarkService.deleteBookmark(bookmarkId);
            logger.info("Bookmark deleted!");
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

    }
}