package com.maro.project.stockanalyzer.repository;

import com.maro.project.stockanalyzer.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // 사용자 ID로 검색
    Optional<User> findByUserId(String userId);
    
    // 사용자 ID 중복 확인
    boolean existsByUserId(String userId);
}