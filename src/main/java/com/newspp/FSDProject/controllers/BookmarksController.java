package com.newspp.FSDProject.controllers;

import com.newspp.FSDProject.exception.BookmarkExistsException;
import com.newspp.FSDProject.exception.BookmarksNotFoundException;
import com.newspp.FSDProject.models.Bookmarks;
import com.newspp.FSDProject.repository.BookmarkDAO;
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
    private BookmarkDAO bookmarkDAO;

    @PostMapping("/addtobookmarks")
    public ResponseEntity<String> addToBookmarks(@RequestBody Bookmarks bookmark)
            throws IOException, BookmarkExistsException, BookmarksNotFoundException {
        List<Bookmarks> list = null;
        List<Bookmarks> bList = bookmarkService.searchBookmarkByDescription(bookmark.getTitle(), bookmark.getUserName());

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


    @GetMapping("/title")
    public ResponseEntity<List<Bookmarks>> searchBookmarkBytitle(@RequestParam("searchText") String searchText) {
        logger.info("search bookmarks for user");
        try {
            List<Bookmarks> bookmarkList = bookmarkDAO.findByTitle("%"+searchText+"%");

            return new ResponseEntity<>(bookmarkList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>( HttpStatus.CONFLICT);

        }
    }

    @GetMapping("/searchByDescription")
    public ResponseEntity<List<Bookmarks>> searchBookmarkByDescription(@RequestParam("searchText") String searchText,@RequestParam("username") String username) {
        logger.info("search bookmarks for user by Description");
        try {
            List<Bookmarks> bookmarkList = bookmarkService.searchBookmarkByDescription(searchText,username);

            return new ResponseEntity<>(bookmarkList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>( HttpStatus.CONFLICT);

        }
    }

    @GetMapping("/searchBySource")
    public ResponseEntity<List<Bookmarks>> searchBookmarkBySource(@RequestParam("searchText") String searchText,@RequestParam("username") String username) {
        logger.info("search bookmarks for user by sources");
        try {
            List<Bookmarks> bookmarkList = bookmarkService.searchBookmarkBySource(searchText,username);

            return new ResponseEntity<>(bookmarkList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>( HttpStatus.CONFLICT);

        }
    }

}