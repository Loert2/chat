package ru.chat.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
public class ChatDTO {
    private Long id;
    private String name;
}
