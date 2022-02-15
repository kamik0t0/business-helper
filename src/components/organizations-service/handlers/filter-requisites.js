export function filterRequisites(organization = false, isORG) {
    if (organization === null || false || undefined) return null;
    return !isORG
        ? organization.filter(
              (field) => field.field !== "kpp" && field.field !== "director"
          )
        : organization;
}
