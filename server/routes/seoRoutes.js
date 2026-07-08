import { Router } from 'express';
import { generateContent, generateMeta, keywordSuggest, analyzeContent, generateSchema, generateSitemap } from '../controllers/seoController.js';

const router = Router();

router.post('/generate-content', generateContent);
router.post('/generate-meta', generateMeta);
router.post('/keyword-suggest', keywordSuggest);
router.post('/analyze', analyzeContent);
router.post('/generate-schema', generateSchema);
router.get('/sitemap', generateSitemap);

export default router;
