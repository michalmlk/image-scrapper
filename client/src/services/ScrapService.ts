import axios from "axios";
class ScrapService {
    async getAllImages(url: string): Promise<string[]> {
        const { data } = await axios.get(`http://localhost:3000/images/scrap/${encodeURIComponent(url)}`);
        return data;
    }
}

const scrapService = new ScrapService();

export default scrapService;