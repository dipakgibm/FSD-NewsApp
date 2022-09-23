package com.newspp.FSDProject.repository;

import com.newspp.FSDProject.models.Bookmarks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BookmarkDAO extends JpaRepository<Bookmarks, Integer> {

    public List<Bookmarks> findByUserName(String userName);

    public Long deleteByBookmarkId(int bookmarkId);

    public boolean existsByUserName(String username);

    public List<Bookmarks> findByTitle(String title);

    @Query("SELECT b FROM Bookmarks b WHERE b.userName = ?1 and( b.description like '% ?2%' or b.title like '%?2')")
    public List<Bookmarks> findByDescriptionAndUserName(String description, String username);


}