package com.newspp.FSDProject.repository;

import com.newspp.FSDProject.models.Bookmarks;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookmarkDAO extends JpaRepository<Bookmarks, Integer> {

    public List<Bookmarks> findByUserName(String userName);

    public Long deleteByBookmarkId(int bookmarkId);

    public boolean existsByUserName(String username);

    public List<Bookmarks> findByTitle(String title);

    public List<Bookmarks> findByTitleAndUserName(String title, String username);

}