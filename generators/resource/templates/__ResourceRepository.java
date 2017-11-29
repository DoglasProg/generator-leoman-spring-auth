package <%= packageName %>;

import org.springframework.data.jpa.repository.JpaRepository;
import <%= packageName %>.entity.%= resourceName %>;

public interface <%= resourceName %>Repository extends JpaRepository<<%= resourceName %>, Long> {
}
