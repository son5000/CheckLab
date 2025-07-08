export function dataSorting(data, key, order) {
  switch (key) {
    case "date":
      return order === "asc" ? sortByDateAsc(data) : sortByDateDesc(data);
    case "fileName":
      return order === "asc"
        ? sortByFilenameNumericAsc(data)
        : sortByFilenameNumericDesc(data);
    default:
      return sortByTextField(data, key, order);
  }
}

export function sortByDateDesc(data) {
  const temp = [...data];
  temp.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    return dateB - dateA;
  });
  return temp;
}

export function sortByDateAsc(data) {
  const temp = [...data];
  temp.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    return dateA - dateB;
  });
  return temp;
}

export function sortByFilenameNumericDesc(data) {
  const temp = [...data];
  temp.sort((a, b) => {
    const fileNameA = Number(a.fileName.replace("_", ""));
    const fileNameB = Number(b.fileName.replace("_", ""));

    return fileNameB - fileNameA;
  });
  return temp;
}

export function sortByFilenameNumericAsc(data) {
  const temp = [...data];
  temp.sort((a, b) => {
    const fileNameA = Number(a.fileName.replace("_", ""));
    const fileNameB = Number(b.fileName.replace("_", ""));

    return fileNameA - fileNameB;
  });
  return temp;
}

export function sortByTextField(data, key, order) {
  return [...data].sort((a, b) => {
    const valA = a[key] || "";
    const valB = b[key] || "";

    return order === "asc"
      ? valA.localeCompare(valB, "ko")
      : valB.localeCompare(valA, "ko");
  });
}
