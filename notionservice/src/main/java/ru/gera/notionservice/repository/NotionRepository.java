package ru.gera.notionservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.gera.notionservice.model.Notion;

import java.util.UUID;

public interface NotionRepository extends JpaRepository<Notion, UUID> {
}
