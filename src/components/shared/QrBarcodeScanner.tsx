import { ChangeEvent, useEffect, useState } from 'react'
import { CameraDevice, Html5Qrcode, Html5QrcodeScannerState } from 'html5-qrcode'
import { MySelect } from './MySelect';

interface QrBarcodeScannerProps {
    reedSucces: (decodeText: string) => void;
}

export const QrBarcodeScanner = ({ reedSucces }: QrBarcodeScannerProps) => {

    const [camaras, setCamaras] = useState<CameraDevice[]>([]);
    const [camaraSeleccionada, setCamaraSeleccionada] = useState<string>();

    useEffect(() => {

        Html5Qrcode.getCameras().then((cameras) => {
            if (cameras && cameras.length) {
                setCamaras(cameras);
            }
        });
        return () => {
            // scanner.clear().catch(error => {
            //     console.error("Failed to clear html5QrcodeScanner. ", error);
            // });
        };
    }, []);


    // const onStartScanner = () => {
    //     const scanner = new Html5Qrcode(/* element id */ "reader");
    //     // Html5QrcodeScannerState.
    //     if (!camaraSeleccionada) return;

    // scanner.start(camaraSeleccionada, {
    //     qrbox: {
    //         width: 300,
    //         height: 270,
    //     },
    //     fps: 10
    // }, (reedSucces), (error) => { console.log(error) })
    // }

    // const onStopScanner = () => {
    //     // scanner.stop().then((ignore) => {
    //     //     // QR Code scanning is stopped.
    //     // }).catch((err) => {
    //     //     // Stop failed, handle it.
    //     // });
    // }

    const [isScanning, setIsScanning] = useState(false);

    useEffect(() => {

        if (!camaraSeleccionada) return;

        const scanner = new Html5Qrcode('reader');

        const startScanner = async () => {
            try {
                await scanner.start(camaraSeleccionada, {
                    qrbox: {
                        width: 300,
                        height: 270,
                    },
                    fps: 10
                }, ((decodedText) => {
                    reedSucces(decodedText);
                    scanner.stop();
                    setIsScanning(false);
                }), (error) => { console.log(error) });
                // setIsScanning(true);

            } catch (error) {
                // Manejar el error, si es necesario
                console.error(error);
            }
        };

        const stopScanner = () => {
            scanner.stop();
            setIsScanning(false);
        };

        if (isScanning) {
            startScanner();
        }

        return () => {
            // stopScanner();
            setIsScanning(false);
            console.log("Stop")
        };
    }, [isScanning, reedSucces]);

    const handleStartClick = () => {
        setIsScanning(true);
    };

    const handleStopClick = () => {
        setIsScanning(false);
    };

    return (
        <div>
            <MySelect
                name='camara'
                label='Seleccione la camara'
                className="form-control"
                onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                    setCamaraSeleccionada(evt.target.value);
                }}
            >
                <option value={''}>Select </option>/
                {
                    camaras?.map(opt => (
                        <option key={opt.id} value={opt.id}>{opt.label}</option>
                    ))
                }
            </MySelect>
            <button className='btn btn-primary' onClick={handleStartClick} >Comenzar</button>
            <button className='btn btn-primary' onClick={handleStopClick}>Detener</button>
            <div id='reader'></div>
        </div>
    );
}

// import { useEffect, useState } from 'react'
// import { Html5QrcodeScanner } from 'html5-qrcode'

// const qrcodeRegionId = "html5qr-code-full-region";
// export const QrBarcodeScanner = () => {

//     const [res, setres] = useState('Nada');

//     useEffect(() => {
//         // when component mounts
//         // const config = createConfig(props);
//         const verbose = true;
//         // Suceess callback is required.
//         // if (!(props.qrCodeSuccessCallback)) {
//         //     throw "qrCodeSuccessCallback is required callback.";
//         // }
//         const scanner = new Html5QrcodeScanner(qrcodeRegionId, {
//             qrbox: {
//                 width: 250,
//                 height: 250
//             },
//             fps: 5,
//             disableFlip: true,
//             showTorchButtonIfSupported: true,
//             aspectRatio: 2
//         }, verbose);
//         scanner.render((decodeText => {
//             console.log(decodeText);
//             setres(decodeText);
//         }), (errorMessage) => {
//             console.log(errorMessage);
//         });

//         // cleanup function when component will unmount
//         return () => {
//             scanner.clear().catch(error => {
//                 console.error("Failed to clear html5QrcodeScanner. ", error);
//             });
//         };
//     }, []);

//     return (
//         <div>
//             <div id={qrcodeRegionId} />
//             <h1>{res}</h1>
//         </div>

//     );
// }
