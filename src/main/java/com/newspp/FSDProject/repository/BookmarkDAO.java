package com.newspp.FSDProject.repository;

import com.newspp.FSDProject.models.Bookmarks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookmarkDAO extends JpaRepository<Bookmarks, Integer> {

    public List<Bookmarks> findByUserName(String userName);

    public Long deleteByBookmarkId(int bookmarkId);

    public boolean existsByUserName(String username);

    public List<Bookmarks> findByTitle(String title);
    String rawQuery="SELECT * FROM bookmarks b WHERE b.user_name =:user and b.description like %:desc%";
    @Query(nativeQuery = true, value = rawQuery)
    public List<Bookmarks> findByDescriptionAndUserName(@Param("desc")String title,@Param("user")String username);


}