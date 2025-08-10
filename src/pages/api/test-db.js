import dbConnect from '../../lib/mongodb';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  try {
    const conn = await dbConnect();
    
    // Test database write permission
    const testCollection = mongoose.connection.db.collection('test');
    await testCollection.insertOne({ 
      test: true, 
      timestamp: new Date() 
    });
    
    // Test database read permission
    const testDoc = await testCollection.findOne({ test: true });

    res.status(200).json({ 
      message: 'Database connected successfully',
      details: {
        host: conn.connection.host,
        name: conn.connection.name,
        port: conn.connection.port,
        status: conn.connection.readyState === 1 ? 'connected' : 'disconnected'
      },
      test: {
        write: 'successful',
        read: testDoc ? 'successful' : 'failed'
      }
    });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ 
      error: 'Database connection failed',
      details: {
        message: error.message,
        code: error.code,
        mongoURI: process.env.MONGODB_URI ? 'configured' : 'missing'
      }
    });
  }
}