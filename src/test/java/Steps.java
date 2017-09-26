import cucumber.api.java8.En;

public class Steps implements En {
    public Steps() {

        Before(new String[]{"@failing-before"}, () -> {
            throw new RuntimeException("failing before hook");
        });

        After(new String[]{"@failing-after"}, () -> {
            throw new RuntimeException("failing after hook");
        });

        Given("^this step passes$", () -> {
        });

        Given("^this step fails$", () -> {
            throw new RuntimeException("this step failed");
        });
    }
}
