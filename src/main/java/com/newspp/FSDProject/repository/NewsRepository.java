package com.newspp.FSDProject.repository;

import com.newspp.FSDProject.models.News;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NewsRepository extends JpaRepository<News,Integer> {
}
