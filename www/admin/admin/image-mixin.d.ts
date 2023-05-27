declare const _default: (mixin: any) => {
    new (): {
        [x: string]: any;
        connectedCallback(): Promise<void>;
        /**
         * encode image and resize
         * @return <Promise(img)>
         */
        encodeAndResize(img: any, size: any, quality: any, enc?: string): Promise<any>;
        /**
         * add image to ipfs and save it's path to firebase
         */
        addImage(key: any, name: any, img: any, size: any, quality: any): Promise<void>;
    };
    [x: string]: any;
};
export default _default;
