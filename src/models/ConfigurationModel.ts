interface ImageDataModel {
    base_url: string;
    secure_base_url: string;
    backdrop_sizes: Array<string>;
    logo_sizes: Array<string>;
    poster_sizes: Array<string>;
    profile_sizes: Array<string>;
    still_sizes: Array<string>;   
}

interface ConfigurationModel {
    images: ImageDataModel;
    change_keys: Array<string>;
}