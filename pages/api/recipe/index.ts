import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const body = JSON.parse(req.body)

    } else {
        // Handle any other HTTP method
    }
}
