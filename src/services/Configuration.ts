import Config from "react-native-config";
import { Api } from "../util/Api";

/**
 * Get configuration.
 *
 *
 * @return {Promise<CongigurationModel>}
 */
function configuration(
  ): Promise<ConfigurationModel> {
    const config = {
      method: "GET",
      uri: `/3/configuration`,
    };

    console.log('congif', config)
  
    return Api.call<ConfigurationModel>(config);
  }


export const TMBD = {
  configuration,
};
  