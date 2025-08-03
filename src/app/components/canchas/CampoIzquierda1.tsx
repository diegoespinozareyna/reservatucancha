import { ArrowDownUp } from "lucide-react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export const CampoIzquierda1 = () => {
    return (
        <div className="-mt">
            <TransformWrapper
                initialScale={1}
                initialPositionX={0}
                initialPositionY={0}
            >
                {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                    <>
                        <div style={{ position: "absolute", zIndex: 1, top: "50" }}>
                            <div className="flex flex-col items-start justify-center">
                                {/* <button
                                    className="bg-blue-500 rounded-lg p-2 m-1 text-white"
                                    onClick={() => zoomIn()}
                                >
                                    Zoom(+)
                                </button>
                                <button
                                    className="bg-blue-500 rounded-lg p-2 m-1 text-white"
                                    onClick={() => zoomOut()}
                                >
                                    Zoom(-)
                                </button> */}
                                <button
                                    className="bg-blue-300 opacity-50 rounded-lg p-2 m-1 text-white text-xs cursor-pointer"
                                    onClick={() => resetTransform()}
                                    type="button"
                                >
                                    <ArrowDownUp size={10} />
                                </button>
                            </div>
                        </div>
                        <TransformComponent>
                            {/* // Aquí va el contenido de tu componente */}
                            <div className="flex flex-col items-center justify-center -mt">
                                {``}
                                <svg
                                    viewBox="0 0 500 500" // ajusta este valor al contenido real
                                    style={
                                        {
                                            // width: "100%",
                                            // height: "calc(200vh - 0px)",
                                        }
                                    }
                                    className="h-[70vh] md:h-[100vh] w-[100%] md:w-[70%]"
                                    preserveAspectRatio="xMidYMin meet"
                                >
                                    <g>
                                        <g
                                            id="canchaizquierda"
                                            transform="matrix(0.45,0,0,0.45,-73,20)"
                                        >
                                            <rect
                                                style={{
                                                    fill: "#ffffff",
                                                    strokeWidth: "1.1",
                                                }}
                                                // // style="fill:#00ff00;stroke-width:0.133533"
                                                id="rect6"
                                                width="68.600662"
                                                height="151.33884"
                                                x="215.86035"
                                                y="31.723946"
                                            />
                                            <rect
                                                style={{
                                                    fill: "#ffffff",
                                                    strokeWidth: "1.1",
                                                }}
                                                // // style="fill:#ffffff;stroke-width:1.2386"
                                                id="rect11"
                                                width="64.235825"
                                                height="1.8434882"
                                                x="75.212654"
                                                y="-242.08038"
                                                transform="rotate(90)"
                                            />
                                            <rect
                                                style={{
                                                    fill: "#ffffff",
                                                    strokeWidth: "1.1",
                                                }}
                                                // // style="fill:#ffffff;stroke-width:0.916671"
                                                id="rect12"
                                                width="35.153137"
                                                height="1.8451149"
                                                x="241.88812"
                                                y="75.222931"
                                            />
                                            <rect
                                                style={{
                                                    fill: "#ffffff",
                                                    strokeWidth: "1.1",
                                                }}
                                                // // style="fill:#ffffff;stroke-width:0.915101"
                                                id="rect13"
                                                width="35.032806"
                                                height="1.8451149"
                                                x="242.00914"
                                                y="137.6022"
                                            />
                                            <rect
                                                style={{
                                                    fill: "#ffffff",
                                                    strokeWidth: "1.1",
                                                }}
                                                // // style="fill:#ffffff;stroke-width:0.579925"
                                                id="rect14"
                                                width="14.081964"
                                                height="1.8434882"
                                                x="263.05276"
                                                y="86.980392"
                                            />
                                            <rect
                                                style={{
                                                    fill: "#ffffff",
                                                    strokeWidth: "1.1",
                                                }}
                                                // // style="fill:#ffffff;stroke-width:0.579627"
                                                id="rect15"
                                                width="14.067494"
                                                height="1.8434882"
                                                x="263.05069"
                                                y="125.94028"
                                            />
                                            <rect
                                                style={{
                                                    fill: "#ffffff",
                                                    strokeWidth: "1.1",
                                                }}
                                                // // style="fill:#ffffff;stroke-width:0.947449"
                                                id="rect16"
                                                width="37.586472"
                                                height="1.8434882"
                                                x="-126.00621"
                                                y="263.05313"
                                                transform="rotate(-90)"
                                            />
                                            <rect
                                                style={{
                                                    fill: "#ffffff",
                                                    strokeWidth: "1.1",
                                                }}
                                                // // style="fill:#ffffff;stroke-width:1.25591"
                                                id="rect8"
                                                width="66.042313"
                                                height="1.8434882"
                                                x="211.1102"
                                                y="176.97984"
                                            />
                                            <rect
                                                style={{
                                                    fill: "#ffffff",
                                                    strokeWidth: "1.1",
                                                }}
                                                // // style="fill:#ffffff;stroke-width:1.21687"
                                                id="rect7"
                                                width="62.000893"
                                                height="1.8434882"
                                                x="215.11746"
                                                y="35.874252"
                                            />
                                            <rect
                                                style={{
                                                    fill: "#ffffff",
                                                    strokeWidth: "1.1",
                                                }}
                                                // // style="fill:#ffffff;stroke-width:1.84772"
                                                id="rect10"
                                                width="142.95026"
                                                height="1.8434882"
                                                x="-178.82431"
                                                y="277.03162"
                                                transform="rotate(-90)"
                                            />
                                            <path
                                                style={{
                                                    fill: "#000",
                                                    strokeWidth: "1.1",
                                                }}
                                                // // style="fill:#ffffff;stroke-width:0.269974"
                                                d="m 277.18711,47.610338 -0.92184,0.02413 -0.99275,-0.168627 -1.20547,-0.385446 -1.30003,-0.67454 -1.15817,-0.770893 -0.87458,-0.698619 -1.11092,-1.132249 -0.99275,-1.39724 -0.42548,-0.722711 -0.44909,-0.867257 -0.30728,-0.794984 -0.18909,-0.843166 v -0.93953 -0.638393 l -1.77276,-0.0061 -0.016,0.790651 0.0335,0.545105 0.1337,0.732484 0.3677,1.209449 0.43457,1.039101 0.81896,1.362763 0.70199,0.988004 0.70198,0.817656 1.25352,1.158341 1.08928,0.854096 1.27638,0.807029 1.33548,0.674529 1.38275,0.45772 1.40639,0.277037 0.42547,0.06023 0.3309,0.018 z"
                                                id="path37"
                                            />
                                            <path
                                                style={{
                                                    fill: "#000",
                                                    strokeWidth: "1.1",
                                                }}
                                                // // style="fill:#ffffff;stroke-width:0.274483"
                                                d="m 266.88628,177.19068 -0.0249,-0.92552 0.17361,-0.99671 0.39685,-1.21028 0.69449,-1.30522 0.79369,-1.1628 0.71929,-0.87807 1.16573,-1.11535 1.43857,-0.99672 0.74409,-0.42717 0.89291,-0.45089 0.81849,-0.3085 0.86811,-0.18985 h 0.96732 0.65728 l 0.006,-1.77984 -0.81403,-0.0161 -0.56123,0.0336 -0.75415,0.13424 -1.24522,0.36917 -1.06984,0.4363 -1.40307,0.82223 -1.01722,0.70479 -0.84184,0.70478 -1.19261,1.25853 -0.87935,1.09363 -0.8309,1.28147 -0.69448,1.34081 -0.47127,1.38828 -0.28522,1.41201 -0.062,0.42716 -0.0185,0.33223 z"
                                                id="path38"
                                            />
                                            <ellipse
                                                style={{
                                                    fill: "#000",
                                                    strokeWidth: "1.1",
                                                }}
                                                // // style="fill:#ffffff;stroke-width:0.468903"
                                                id="ellipse44"
                                                cx="252.79443"
                                                cy="107.54205"
                                                rx="1.285202"
                                                ry="1.2864275"
                                            />
                                            <g
                                                id="g51"
                                            // // style="fill:#ffffff"
                                            >
                                                <rect
                                                    style={{
                                                        fill: "#000",
                                                        strokeWidth: "1.1",
                                                    }}
                                                    // // style="fill:#ffffff;stroke-width:0.663628"
                                                    id="rect49"
                                                    width="21.91066"
                                                    height="1.5515064"
                                                    x="-118.35988"
                                                    y="280.2644"
                                                    transform="rotate(-90)"
                                                />
                                                <rect
                                                    style={{
                                                        fill: "#000",
                                                        strokeWidth: "1.1",
                                                    }}
                                                    // // style="fill:#ffffff;stroke-width:0.186295"
                                                    id="rect50"
                                                    width="1.6906258"
                                                    height="1.5845793"
                                                    x="-280.46542"
                                                    y="-98.033089"
                                                    transform="scale(-1)"
                                                />
                                                <rect
                                                    style={{
                                                        fill: "#000",
                                                        strokeWidth: "1.1",
                                                    }}
                                                    // // style="fill:#ffffff;stroke-width:0.174144"
                                                    id="rect51"
                                                    width="1.5500659"
                                                    height="1.5101653"
                                                    x="-280.35092"
                                                    y="-118.36002"
                                                    transform="scale(-1)"
                                                />
                                            </g>
                                            <path
                                                style={{
                                                    fill: "#000",
                                                    strokeWidth: "1.1",
                                                }}
                                                // // style="fill:#ffffff;stroke-width:0.287783"
                                                d="m 240.53992,121.00602 -0.52284,-0.42076 -0.60127,-0.66827 -0.60126,-0.86626 -0.549,-0.79202 -0.6797,-1.11376 -0.54897,-0.96527 -0.36599,-0.71776 -0.49669,-1.26227 -0.23528,-0.96527 -0.13071,-0.94052 -0.15686,-1.65828 -0.0784,-1.90578 -0.0784,-1.46028 -0.0784,-0.86625 0.0261,-0.71778 0.0523,-0.61874 0.10455,-1.06427 0.20914,-1.01477 0.33985,-1.06426 0.54898,-1.36129 0.60127,-1.23751 0.65355,-1.336531 0.49669,-0.89102 0.41828,-0.680626 0.4444,-0.643513 0.52285,-0.717752 0.23528,-0.173257 0.20913,-0.160883 0.26876,-0.0987 v -2.826446 l -0.46213,0.411256 -0.76713,0.778825 -0.99822,1.120071 -0.60075,0.603791 -0.7579,0.971306 -0.96992,1.341743 -0.82347,1.38603 -0.60126,1.274639 -0.57514,1.584017 -0.33983,1.38603 -0.16994,1.46028 -0.18299,1.46028 -0.0654,1.49739 0.0784,2.0048 0.11763,2.52455 0.15686,1.01476 0.31369,1.23752 0.45748,1.34887 0.48364,1.2499 0.70583,1.41077 0.78427,1.3489 0.99338,1.38602 1.07184,1.16329 1.01953,1.00238 0.91496,0.90339 0.21242,0.2011 z"
                                                id="path56"
                                            />
                                            <rect
                                                // // style="fill:#00ffff;stroke-width:1.15574"
                                                style={{
                                                    fill: "#00ffff",
                                                    strokeWidth: "1.1",
                                                }}
                                                id="rect74-7"
                                                width="5.2890892"
                                                height="151.33707"
                                                x="210.57147"
                                                y="31.691246"
                                            />
                                            <rect
                                                // // style="fill:#00ffff;stroke-width:1.15589"
                                                style={{
                                                    fill: "#00ffff",
                                                    strokeWidth: "1.1",
                                                }}
                                                id="rect81-0"
                                                width="5.2902389"
                                                height="151.34242"
                                                x="275.45563"
                                                y="31.688187"
                                            />
                                        </g>
                                    </g>
                                    <g>
                                        <g
                                            id="canchaizquierdalineas"
                                            transform="matrix(0.45,0,0,0.45,-73,20)"
                                        >
                                            <rect
                                                // style="fill:#00ff00;stroke-width:0.133533"
                                                id="rect6"
                                                width="68.600662"
                                                height="151.33884"
                                                x="215.86035"
                                                y="31.723946"
                                            />
                                            <rect
                                                // style="fill:#ffffff;stroke-width:1.2386"
                                                id="rect11"
                                                width="64.235825"
                                                height="1.8434882"
                                                x="75.212654"
                                                y="-242.08038"
                                                transform="rotate(90)"
                                            />
                                            <rect
                                                // style="fill:#ffffff;stroke-width:0.916671"
                                                id="rect12"
                                                width="35.153137"
                                                height="1.8451149"
                                                x="241.88812"
                                                y="75.222931"
                                            />
                                            <rect
                                                // style="fill:#ffffff;stroke-width:0.915101"
                                                id="rect13"
                                                width="35.032806"
                                                height="1.8451149"
                                                x="242.00914"
                                                y="137.6022"
                                            />
                                            <rect
                                                // style="fill:#ffffff;stroke-width:0.579925"
                                                id="rect14"
                                                width="14.081964"
                                                height="1.8434882"
                                                x="263.05276"
                                                y="86.980392"
                                            />
                                            <rect
                                                // style="fill:#ffffff;stroke-width:0.579627"
                                                id="rect15"
                                                width="14.067494"
                                                height="1.8434882"
                                                x="263.05069"
                                                y="125.94028"
                                            />
                                            <rect
                                                // style="fill:#ffffff;stroke-width:0.947449"
                                                id="rect16"
                                                width="37.586472"
                                                height="1.8434882"
                                                x="-126.00621"
                                                y="263.05313"
                                                transform="rotate(-90)"
                                            />
                                            <rect
                                                // style="fill:#ffffff;stroke-width:1.25591"
                                                id="rect8"
                                                width="66.042313"
                                                height="1.8434882"
                                                x="211.1102"
                                                y="176.97984"
                                            />
                                            <rect
                                                // style="fill:#ffffff;stroke-width:1.21687"
                                                id="rect7"
                                                width="62.000893"
                                                height="1.8434882"
                                                x="215.11746"
                                                y="35.874252"
                                            />
                                            <rect
                                                // style="fill:#ffffff;stroke-width:1.84772"
                                                id="rect10"
                                                width="142.95026"
                                                height="1.8434882"
                                                x="-178.82431"
                                                y="277.03162"
                                                transform="rotate(-90)"
                                            />
                                            <path
                                                // style="fill:#ffffff;stroke-width:0.269974"
                                                d="m 277.18711,47.610338 -0.92184,0.02413 -0.99275,-0.168627 -1.20547,-0.385446 -1.30003,-0.67454 -1.15817,-0.770893 -0.87458,-0.698619 -1.11092,-1.132249 -0.99275,-1.39724 -0.42548,-0.722711 -0.44909,-0.867257 -0.30728,-0.794984 -0.18909,-0.843166 v -0.93953 -0.638393 l -1.77276,-0.0061 -0.016,0.790651 0.0335,0.545105 0.1337,0.732484 0.3677,1.209449 0.43457,1.039101 0.81896,1.362763 0.70199,0.988004 0.70198,0.817656 1.25352,1.158341 1.08928,0.854096 1.27638,0.807029 1.33548,0.674529 1.38275,0.45772 1.40639,0.277037 0.42547,0.06023 0.3309,0.018 z"
                                                id="path37"
                                            />
                                            <path
                                                // style="fill:#ffffff;stroke-width:0.274483"
                                                d="m 266.88628,177.19068 -0.0249,-0.92552 0.17361,-0.99671 0.39685,-1.21028 0.69449,-1.30522 0.79369,-1.1628 0.71929,-0.87807 1.16573,-1.11535 1.43857,-0.99672 0.74409,-0.42717 0.89291,-0.45089 0.81849,-0.3085 0.86811,-0.18985 h 0.96732 0.65728 l 0.006,-1.77984 -0.81403,-0.0161 -0.56123,0.0336 -0.75415,0.13424 -1.24522,0.36917 -1.06984,0.4363 -1.40307,0.82223 -1.01722,0.70479 -0.84184,0.70478 -1.19261,1.25853 -0.87935,1.09363 -0.8309,1.28147 -0.69448,1.34081 -0.47127,1.38828 -0.28522,1.41201 -0.062,0.42716 -0.0185,0.33223 z"
                                                id="path38"
                                            />
                                            <ellipse
                                                // style="fill:#ffffff;stroke-width:0.468903"
                                                id="ellipse44"
                                                cx="252.79443"
                                                cy="107.54205"
                                                rx="1.285202"
                                                ry="1.2864275"
                                            />
                                            <g id="g51"
                                            // style="fill:#ffffff"
                                            >
                                                <rect
                                                    // style="fill:#ffffff;stroke-width:0.663628"
                                                    id="rect49"
                                                    width="21.91066"
                                                    height="1.5515064"
                                                    x="-118.35988"
                                                    y="280.2644"
                                                    transform="rotate(-90)"
                                                />
                                                <rect
                                                    // style="fill:#ffffff;stroke-width:0.186295"
                                                    id="rect50"
                                                    width="1.6906258"
                                                    height="1.5845793"
                                                    x="-280.46542"
                                                    y="-98.033089"
                                                    transform="scale(-1)"
                                                />
                                                <rect
                                                    // style="fill:#ffffff;stroke-width:0.174144"
                                                    id="rect51"
                                                    width="1.5500659"
                                                    height="1.5101653"
                                                    x="-280.35092"
                                                    y="-118.36002"
                                                    transform="scale(-1)"
                                                />
                                            </g>
                                            <path
                                                // style="fill:#ffffff;stroke-width:0.287783"
                                                d="m 240.53992,121.00602 -0.52284,-0.42076 -0.60127,-0.66827 -0.60126,-0.86626 -0.549,-0.79202 -0.6797,-1.11376 -0.54897,-0.96527 -0.36599,-0.71776 -0.49669,-1.26227 -0.23528,-0.96527 -0.13071,-0.94052 -0.15686,-1.65828 -0.0784,-1.90578 -0.0784,-1.46028 -0.0784,-0.86625 0.0261,-0.71778 0.0523,-0.61874 0.10455,-1.06427 0.20914,-1.01477 0.33985,-1.06426 0.54898,-1.36129 0.60127,-1.23751 0.65355,-1.336531 0.49669,-0.89102 0.41828,-0.680626 0.4444,-0.643513 0.52285,-0.717752 0.23528,-0.173257 0.20913,-0.160883 0.26876,-0.0987 v -2.826446 l -0.46213,0.411256 -0.76713,0.778825 -0.99822,1.120071 -0.60075,0.603791 -0.7579,0.971306 -0.96992,1.341743 -0.82347,1.38603 -0.60126,1.274639 -0.57514,1.584017 -0.33983,1.38603 -0.16994,1.46028 -0.18299,1.46028 -0.0654,1.49739 0.0784,2.0048 0.11763,2.52455 0.15686,1.01476 0.31369,1.23752 0.45748,1.34887 0.48364,1.2499 0.70583,1.41077 0.78427,1.3489 0.99338,1.38602 1.07184,1.16329 1.01953,1.00238 0.91496,0.90339 0.21242,0.2011 z"
                                                id="path56"
                                            />
                                            <rect
                                                // style="fill:#00ffff;stroke-width:1.15574"
                                                id="rect74-7"
                                                width="5.2890892"
                                                height="151.33707"
                                                x="210.57147"
                                                y="31.691246"
                                            />
                                            <rect
                                                // style="fill:#00ffff;stroke-width:1.15589"
                                                id="rect81-0"
                                                width="5.2902389"
                                                height="151.34242"
                                                x="275.45563"
                                                y="31.688187"
                                            />
                                        </g>
                                    </g>
                                </svg>
                            </div>
                        </TransformComponent>
                    </>
                )}
            </TransformWrapper>
        </div>
    );
};
