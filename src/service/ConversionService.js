import {httpClient} from "../interceptors/HttpBaseClient";

class ConversionService {
  static convert = (request) => {
    return httpClient.postData("unit-conversion/convert", request);
  };
}
export default ConversionService;
