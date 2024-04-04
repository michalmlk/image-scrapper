import scrapService from "./services/ScrapService.ts";
import { ToastContainer, toast } from "react-toastify";
import {ChangeEvent, useState} from "react";
import 'react-toastify/dist/ReactToastify.css';
import {Button, Card, CardBody, Input, Image } from "@nextui-org/react";


function App() {
    const [isLoading, setIsLoading] = useState(false)
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const handleScrap = async ():Promise<void> => {
        setIsLoading(true)
        const toastId = toast.loading('Scrapping')
        try {
            const images = await scrapService.getAllImages(inputValue);
            setImageUrls(images);
            toast.success('Scrapping completed')
        } catch (e) {
            console.log('error!')
            toast.error('Failed to scrap 😢')
        } finally {
            setIsLoading(false);
            toast.dismiss(toastId)
        }

    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setInputValue(e.target.value)
    }

    return (
        <div className="flex justify-center w-full p-8">
            <ToastContainer/>
                <div className="flex flex-col w-full min-h-screen justify-start items-center max-w-screen-xl">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-3xl">Image scrapper</h1>
                        <div className="flex gap-2 w-full max-w-screen-sm">
                            <Input type="text" placeholder="Insert page url" className="w-full" onChange={handleInputChange}/>
                            <Button onClick={handleScrap} isLoading={isLoading} disabled={!inputValue.length}>Scrap</Button>
                        </div>
                    </div>
                    <div className="grid p-8 gap-8 grid-cols-2">
                        {imageUrls.map(imageUrl => (
                            <Card className="py-4">
                                <CardBody className="overflow-visible py-2">
                                    <Image
                                        alt="Card background"
                                        className="object-cover rounded-xl"
                                        src={imageUrl}
                                        width={270}
                                    />
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                </div>
        </div>
    )
}

export default App
