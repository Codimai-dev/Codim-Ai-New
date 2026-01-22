// js/blog-service.js
// Clean Firestore + Storage Blog Service (Admin CMS)

import { db, storage, auth } from './firebase-config.js';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  orderBy,
  where,
  limit,
  serverTimestamp
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js';

class BlogService {
  constructor() {
    // 🔒 SINGLE SOURCE OF TRUTH
    this.collectionName = 'blogPosts';
  }

  /* =========================
     CREATE BLOG
  ========================= */
  async createBlog(blogData) {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('Not authenticated');

      const docRef = await addDoc(
        collection(db, this.collectionName),
        {
          ...blogData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          adminEmail: user.email,
          published: !!blogData.published
        }
      );

      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Create blog error:', error);
      return { success: false, error: error.message };
    }
  }

  /* =========================
     UPDATE BLOG
  ========================= */
  async updateBlog(blogId, blogData) {
    try {
      const refDoc = doc(db, this.collectionName, blogId);

      await updateDoc(refDoc, {
        ...blogData,
        updatedAt: serverTimestamp()
      });

      return { success: true };
    } catch (error) {
      console.error('Update blog error:', error);
      return { success: false, error: error.message };
    }
  }

  /* =========================
     DELETE BLOG
  ========================= */
  async deleteBlog(blogId) {
    try {
      await deleteDoc(doc(db, this.collectionName, blogId));
      return { success: true };
    } catch (error) {
      console.error('Delete blog error:', error);
      return { success: false, error: error.message };
    }
  }

  /* =========================
     GET ALL BLOGS (ADMIN)
     - shows drafts + published
  ========================= */
  async getAllBlogs() {
    try {
      const q = query(
        collection(db, this.collectionName),
        orderBy('createdAt', 'desc')
      );

      const snap = await getDocs(q);

      return snap.docs.map(d => ({
        id: d.id,
        ...d.data(),
        createdAt: d.data().createdAt?.toDate?.(),
        updatedAt: d.data().updatedAt?.toDate?.()
      }));
    } catch (error) {
      console.error('Get blogs error:', error);
      return [];
    }
  }

  /* =========================
     GET BLOG BY SLUG (PUBLIC)
  ========================= */
  async getBlogBySlug(slug) {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('slug', '==', slug),
        where('published', '==', true),
        limit(1)
      );

      const snap = await getDocs(q);

      if (snap.empty) return null;

      const d = snap.docs[0];
      return {
        id: d.id,
        ...d.data(),
        createdAt: d.data().createdAt?.toDate?.(),
        updatedAt: d.data().updatedAt?.toDate?.()
      };
    } catch (error) {
      console.error('Get blog by slug error:', error);
      return null;
    }
  }

  /* =========================
     IMAGE UPLOAD (STORAGE)
  ========================= */
  async uploadImage(file, folder = 'blog-images') {
    try {
      if (!file) throw new Error('No file provided');

      const fileName = `${Date.now()}-${file.name}`;
      const storageRef = ref(storage, `${folder}/${fileName}`);

      const metadata = {
        contentType: file.type || 'image/jpeg'
      };

      const snapshot = await uploadBytes(storageRef, file, metadata);
      const url = await getDownloadURL(snapshot.ref);

      return {
        success: true,
        url,
        path: `${folder}/${fileName}`
      };
    } catch (error) {
      console.error('Image upload error:', error);
      return { success: false, error: error.message };
    }
  }

  /* =========================
     DELETE IMAGE
  ========================= */
  async deleteImage(pathOrUrl) {
    try {
      let path = pathOrUrl;

      if (path.startsWith('http')) {
        const url = new URL(path);
        const name = url.searchParams.get('name');
        if (name) path = decodeURIComponent(name);
      }

      await deleteObject(ref(storage, path));
      return { success: true };
    } catch (error) {
      console.error('Delete image error:', error);
      return { success: false, error: error.message };
    }
  }
}

// ✅ EXPORT SINGLE INSTANCE (matches your admin code)
export default new BlogService();
