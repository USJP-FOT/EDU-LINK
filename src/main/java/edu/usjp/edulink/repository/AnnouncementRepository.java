package edu.usjp.edulink.repository;

import edu.usjp.edulink.entity.AnnouncementEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnnouncementRepository extends JpaRepository<AnnouncementEntity, Integer> {
}
