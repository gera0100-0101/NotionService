package ru.gera.notionservice.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "notion")
@Data
@NoArgsConstructor
public class Notion {
    @Id
    @GeneratedValue
    private UUID id;

    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "notion_type")
    private NotionType notionType;

    @Column(name = "is_cycled")
    private Boolean isCycled;

    @Enumerated(EnumType.STRING)
    @Column(name = "cycle_range")
    private CycleRange cycleRange;

    @Column(name = "week_day_repeat")
    private String weekDayRepeat;

    @Column(name = "target_date")
    private LocalDateTime targetDate;

    @Column(name = "time_repeat")
    private LocalTime timeRepeat;
}
