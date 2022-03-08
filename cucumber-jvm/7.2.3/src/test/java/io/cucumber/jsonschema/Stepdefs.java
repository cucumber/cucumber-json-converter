package io.cucumber.jsonschema;

import io.cucumber.java.Before;

public class Stepdefs {
    private static int decay = 0;

    @Before()
    public void tmp() {
        throw new RuntimeException("failing before hook");
    }

    @Before("@failing_before")
    public void before() {
        throw new RuntimeException("failing before hook");
    }

//        After(new String[]{"@failing_after"}, () -> {
//            throw new RuntimeException("failing after hook");
//        });
//
//        Given(".*pass.*", () -> {
//        });
//
//        Given(".*pending.*", () -> {
//            throw new PendingException();
//        });
//
//        Given(".*fail.*", () -> {
//            throw new RuntimeException("this step failed");
//        });
//
//        Given(".*decaying*", () -> {
//            boolean failing = decay > 0;
//            decay++;
//            if(failing) throw new RuntimeException("Decayed");
}
