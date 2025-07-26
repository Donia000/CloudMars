import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendEmailVerification,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { 
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  query,
  where,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { 
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyA063XJ-JSop9lKWijCXRZ0x__-0Yhly6w",
  authDomain: "cloudmars.firebaseapp.com",
  projectId: "cloudmars",
  storageBucket: "cloudmars.appspot.com",
  messagingSenderId: "362432525506",
  appId: "1:362432525506:web:867c3ad665c2b5bce5375b",
  measurementId: "G-RTGWDBJ1TY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Social login providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const githubProvider = new GithubAuthProvider();

// Function to sign in with Google
async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Check if user exists in Firestore
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);
    
    if (!userDoc.exists()) {
      // Create new user document
      await setDoc(userDocRef, {
        firstName: user.displayName?.split(' ')[0] || '',
        lastName: user.displayName?.split(' ')[1] || '',
        email: user.email || '',
        phone: '',
        age: '',
        gender: '',
        university: '',
        major: '',
        graduationYear: '',
        internationalId: '',
        skills: [],
        createdAt: new Date(),
        lastLogin: new Date(),
        points: 0,
        pointsHistory: [],
        enrolledCourses: [],
        schedule: []
      });
    } else {
      // Update last login
      await updateDoc(userDocRef, {
        lastLogin: new Date()
      });
    }
    
    return user;
  } catch (error) {
    console.error("Google sign-in error:", error);
    throw error;
  }
}

// Function to sign in with Facebook
async function signInWithFacebook() {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    const user = result.user;
    
    // Check if user exists in Firestore
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);
    
    if (!userDoc.exists()) {
      // Create new user document
      await setDoc(userDocRef, {
        firstName: user.displayName?.split(' ')[0] || '',
        lastName: user.displayName?.split(' ')[1] || '',
        email: user.email || '',
        phone: '',
        age: '',
        gender: '',
        university: '',
        major: '',
        graduationYear: '',
        internationalId: '',
        skills: [],
        createdAt: new Date(),
        lastLogin: new Date(),
        points: 0,
        pointsHistory: [],
        enrolledCourses: [],
        schedule: []
      });
    } else {
      // Update last login
      await updateDoc(userDocRef, {
        lastLogin: new Date()
      });
    }
    
    return user;
  } catch (error) {
    console.error("Facebook sign-in error:", error);
    throw error;
  }
}

// Function to sign in with GitHub
async function signInWithGithub() {
  try {
    const result = await signInWithPopup(auth, githubProvider);
    const user = result.user;
    
    // Check if user exists in Firestore
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);
    
    if (!userDoc.exists()) {
      // Create new user document
      await setDoc(userDocRef, {
        firstName: user.displayName?.split(' ')[0] || '',
        lastName: user.displayName?.split(' ')[1] || '',
        email: user.email || '',
        phone: '',
        age: '',
        gender: '',
        university: '',
        major: '',
        graduationYear: '',
        internationalId: '',
        skills: [],
        createdAt: new Date(),
        lastLogin: new Date(),
        points: 0,
        pointsHistory: [],
        enrolledCourses: [],
        schedule: []
      });
    } else {
      // Update last login
      await updateDoc(userDocRef, {
        lastLogin: new Date()
      });
    }
    
    return user;
  } catch (error) {
    console.error("GitHub sign-in error:", error);
    throw error;
  }
}

// Function to enroll a course for a user
async function enrollCourse(userId, courseId, courseName) {
  try {
    const userDocRef = doc(db, "users", userId);
    
    // Get the user document
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
      throw new Error("User does not exist");
    }

    // Check if the course is already enrolled
    const currentEnrolledCourses = userDoc.data().enrolledCourses || [];
    const isCourseEnrolled = currentEnrolledCourses.some(
      (course) => course.courseId === courseId
    );

    if (isCourseEnrolled) {
      console.log("Course already enrolled!");
      return false; // Course already exists, no need to enroll again
    }

    // Define course-specific URLs
    let courseUrl;
    switch (courseId) {
      case "ds101":
          courseUrl = "/data.html";
          break;
      case "machine-learning":
        courseUrl = "/machine_learning.html"; // Redirect to machine_learning.html
        break;
      case "web-development":
        courseUrl = "/web.html"; // Redirect to web.html
        break;
      default:
        courseUrl = `/courses/${courseId}`; // Fallback for other courses
    }

    // Add the course to the enrolledCourses array
    const newCourse = {
      courseId: courseId,
      courseName: courseName,
      enrollmentDate: new Date().toISOString(),
      status: "active",
      progress: 0,
      grade: "N/A",
      courseUrl: courseUrl // Use the defined URL
    };

    // Update the enrolledCourses array
    await updateDoc(userDocRef, {
      enrolledCourses: [...currentEnrolledCourses, newCourse]
    });

    console.log("Course enrolled successfully!");
    return true;
  } catch (error) {
    console.error("Error enrolling course:", error);
    throw error;
  }
}

// دالة لإضافة نقاط لليوزر وتحديث points و pointsHistory
async function addUserPoints(userId, pointsToAdd, source, courseId = null) {
  try {
    console.log(`Attempting to add ${pointsToAdd} points for user ${userId}, source: ${source}, courseId: ${courseId}`);
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      console.error(`User ${userId} does not exist`);
      throw new Error("User does not exist");
    }

    const userData = userDoc.data();
    const currentPoints = userData.points || 0;
    const currentPointsHistory = userData.pointsHistory || [];

    console.log(`Current points for user ${userId}: ${currentPoints}`);
    console.log(`Current points history for user ${userId}:`, currentPointsHistory);

    // إضافة سجل جديد في pointsHistory
    const newHistoryEntry = {
      points: pointsToAdd,
      source: source, // مثلاً "quiz", "task", "course_completion"
      courseId: courseId || null,
      timestamp: new Date().toISOString()
    };

    // تحديث النقاط الكلية وتاريخ النقاط
    await updateDoc(userDocRef, {
      points: currentPoints + pointsToAdd,
      pointsHistory: [...currentPointsHistory, newHistoryEntry]
    });

    console.log(`Successfully added ${pointsToAdd} points to user ${userId}. New total: ${currentPoints + pointsToAdd}`);
    console.log(`Updated pointsHistory for user ${userId}:`, [...currentPointsHistory, newHistoryEntry]);

    // جلب البيانات المحدثة للتأكد
    const updatedDoc = await getDoc(userDocRef);
    if (updatedDoc.exists()) {
      console.log(`Verified updated data for user ${userId}:`, updatedDoc.data());
    }

    return true;
  } catch (error) {
    console.error(`Error adding points for user ${userId}:`, error);
    throw error;
  }
}

// Export all necessary functions and objects
export { 
  app,
  auth,
  db,
  storage,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendEmailVerification,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  ref,
  uploadBytes,
  getDownloadURL,
  signInWithGoogle,
  signInWithFacebook,
  signInWithGithub,
  query,
  where,
  onSnapshot,
  enrollCourse,
  addUserPoints
};