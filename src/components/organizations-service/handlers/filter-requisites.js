export function filterRequisites(organization, isORG) {
    return !isORG
        ? organization.filter(
              (field) => field.field !== "kpp" && field.field !== "director"
          )
        : organization;
}
