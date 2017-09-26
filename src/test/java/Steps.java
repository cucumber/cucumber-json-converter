import cucumber.api.PendingException;
import cucumber.api.java8.En;

public class Steps implements En {
    private static int x = 0;

    public Steps() {

        Before(new String[]{"@failing-before"}, () -> {
            throw new RuntimeException("failing before hook");
        });

        After(new String[]{"@failing-after"}, () -> {
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

        Given(".*flaky*", () -> {
            boolean failing = x == 0;
            x++;
            if(failing) throw new RuntimeException("Flaky");
        });
    }
}
