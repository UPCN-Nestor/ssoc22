package com.upcn.ssoc22;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {
        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("com.upcn.ssoc22");

        noClasses()
            .that()
            .resideInAnyPackage("com.upcn.ssoc22.service..")
            .or()
            .resideInAnyPackage("com.upcn.ssoc22.repository..")
            .should()
            .dependOnClassesThat()
            .resideInAnyPackage("..com.upcn.ssoc22.web..")
            .because("Services and repositories should not depend on web layer")
            .check(importedClasses);
    }
}
