import { useEffect } from "react";

const DocumentTitle = (title: string) => {
  useEffect(() => {
    document.title = `AFM Shop | ${title}`;
  }, [title]);
};

export default DocumentTitle;
