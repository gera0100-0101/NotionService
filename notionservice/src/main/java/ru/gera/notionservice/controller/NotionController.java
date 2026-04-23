package ru.gera.notionservice.controller;

import org.springframework.web.bind.annotation.*;
import ru.gera.notionservice.model.Notion;
import ru.gera.notionservice.repository.NotionRepository;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/notions")
public class NotionController {

    private final NotionRepository notionRepository;

    public NotionController(NotionRepository notionRepository) {
        this.notionRepository = notionRepository;
    }

    @PostMapping
    public Notion create(@RequestBody Notion notion) {
        return notionRepository.save(notion);
    }

    @GetMapping
    public List<Notion> getAll() {
        return notionRepository.findAll();
    }

    @GetMapping("/{id}")
    public Notion getById(@PathVariable UUID id) {
        return notionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notion not found"));
    }

    @PutMapping("/{id}")
    public Notion update(@PathVariable UUID id, @RequestBody Notion updated) {
        return notionRepository.findById(id)
                .map(notion -> {
                    notion.setName(updated.getName());
                    notion.setNotionType(updated.getNotionType());
                    notion.setIsCycled(updated.getIsCycled());
                    notion.setCycleRange(updated.getCycleRange());
                    notion.setWeekDayRepeat(updated.getWeekDayRepeat());
                    notion.setTimeRepeat(updated.getTimeRepeat());
                    return notionRepository.save(notion);
                })
                .orElseThrow(() -> new RuntimeException("Notion not found"));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        notionRepository.deleteById(id);
    }
}
