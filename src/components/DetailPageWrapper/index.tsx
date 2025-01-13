import DetailPage from "../DetailPage";
import { useParams } from "react-router-dom";
import data from "../../../data/data.json";

export default function DetailPageWrapper() {
  const { alpha3Code } = useParams<{ alpha3Code: string }>();
  const country = data.find((country) => country.alpha3Code === alpha3Code);

  if (!country) {
    return <div>Country not found</div>;
  }

  return <DetailPage country={country} />;
}
