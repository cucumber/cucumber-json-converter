import cucumber.api.PendingException;
import cucumber.api.java8.En;

public class Steps implements En {
    private static int decay = 0;

    public Steps() {

        Before(new String[]{"@failing_before"}, () -> {
            throw new RuntimeException("failing before hook");
        });

        After(new String[]{"@failing_after"}, () -> {
            throw new RuntimeException("failing after hook");
        });

        Given(".*pass.*", () -> {
        });

        Given(".*pending.*", () -> {
            throw new PendingException();
        });

        Given(".*fail.*", () -> {
            throw new RuntimeException("this step failed");
        });

        Given(".*decaying*", () -> {
            boolean failing = decay > 0;
            decay++;
            if(failing) throw new RuntimeException("Decayed");
        });
    }
}
