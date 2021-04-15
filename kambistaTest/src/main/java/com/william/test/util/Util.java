package com.william.test.util;

import java.time.Duration;
import java.time.LocalDateTime;

public class Util {
	
	private Util() {
	    throw new IllegalStateException("Utility class");
	  }

	public static int difInMinutes(LocalDateTime start, LocalDateTime end) {
		Duration duration = Duration.between(start, end);
		return Math.toIntExact(duration.toMinutes());
	}
	
	public static int difInHours(LocalDateTime start, LocalDateTime end) {
		Duration duration = Duration.between(start, end);
		return Math.toIntExact(duration.toHours());
	}
}
