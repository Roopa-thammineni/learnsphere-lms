// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import {
//   ArrowLeft,
//   Save,
//   Eye,
//   Users,
//   Mail,
//   Image as ImageIcon,
//   Plus,
//   Trash2,
//   GripVertical,
//   Video,
//   FileText,
//   ImageIcon as ImageType,
//   HelpCircle,
//   Edit,
//   ExternalLink,
//   Download,
//   Upload,
//   Link as LinkIcon,
// } from 'lucide-react';
// import { useCourses } from '@/hooks/useCourses';
// import { Course, Lesson, LessonType, CourseVisibility, CourseAccessRule } from '@/types';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Label } from '@/components/ui/label';
// import { Badge } from '@/components/ui/badge';
// import { Switch } from '@/components/ui/switch';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from '@/components/ui/dialog';
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from '@/components/ui/alert-dialog';
// import { cn } from '@/lib/utils';
// import { mockLessons } from '@/data/mockData';

// const lessonTypeIcons: Record<LessonType, React.ElementType> = {
//   video: Video,
//   document: FileText,
//   image: ImageType,
//   quiz: HelpCircle,
// };

// export function CourseEditor() {
//   const { courseId } = useParams();
//   const navigate = useNavigate();
//   const { getCourseById, updateCourse, isLoading } = useCourses();

//   const [course, setCourse] = useState<Course | null>(null);
//   const [lessons, setLessons] = useState<Lesson[]>([]);
//   const [activeTab, setActiveTab] = useState('content');
//   const [isLessonDialogOpen, setIsLessonDialogOpen] = useState(false);
//   const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
//   const [deleteConfirmLesson, setDeleteConfirmLesson] = useState<Lesson | null>(null);
//   const [hasChanges, setHasChanges] = useState(false);

//   // Lesson form state
//   const [lessonTitle, setLessonTitle] = useState('');
//   const [lessonType, setLessonType] = useState<LessonType>('video');
//   const [lessonDescription, setLessonDescription] = useState('');
//   const [lessonVideoUrl, setLessonVideoUrl] = useState('');
//   const [lessonDuration, setLessonDuration] = useState('');
//   const [lessonAllowDownload, setLessonAllowDownload] = useState(false);

//   useEffect(() => {
//     if (courseId) {
//       const foundCourse = getCourseById(courseId);
//       if (foundCourse) {
//         setCourse(foundCourse);
//         // Get lessons for this course from mock data
//         const courseLessons = mockLessons.filter(l => l.courseId === courseId);
//         setLessons(courseLessons);
//       }
//     }
//   }, [courseId, getCourseById]);

//   const handleSave = async () => {
//     if (course) {
//       await updateCourse(course.id, course);
//       setHasChanges(false);
//     }
//   };

//   const handleCourseChange = (field: keyof Course, value: any) => {
//     if (course) {
//       setCourse({ ...course, [field]: value });
//       setHasChanges(true);
//     }
//   };

//   const handleTogglePublish = () => {
//     if (course) {
//       const newStatus = course.status === 'published' ? 'draft' : 'published';
//       handleCourseChange('status', newStatus);
//     }
//   };

//   const openLessonDialog = (lesson?: Lesson) => {
//     if (lesson) {
//       setEditingLesson(lesson);
//       setLessonTitle(lesson.title);
//       setLessonType(lesson.type);
//       setLessonDescription(lesson.description);
//       setLessonVideoUrl(lesson.videoUrl || '');
//       setLessonDuration(lesson.duration.toString());
//       setLessonAllowDownload(lesson.allowDownload);
//     } else {
//       setEditingLesson(null);
//       setLessonTitle('');
//       setLessonType('video');
//       setLessonDescription('');
//       setLessonVideoUrl('');
//       setLessonDuration('');
//       setLessonAllowDownload(false);
//     }
//     setIsLessonDialogOpen(true);
//   };

//   const handleSaveLesson = () => {
//     if (!lessonTitle.trim()) return;

//     if (editingLesson) {
//       setLessons(prev =>
//         prev.map(l =>
//           l.id === editingLesson.id
//             ? {
//                 ...l,
//                 title: lessonTitle,
//                 type: lessonType,
//                 description: lessonDescription,
//                 videoUrl: lessonVideoUrl,
//                 duration: parseInt(lessonDuration) || 0,
//                 allowDownload: lessonAllowDownload,
//                 updatedAt: new Date(),
//               }
//             : l
//         )
//       );
//     } else {
//       const newLesson: Lesson = {
//         id: `lesson-${Date.now()}`,
//         courseId: courseId!,
//         title: lessonTitle,
//         type: lessonType,
//         description: lessonDescription,
//         order: lessons.length + 1,
//         duration: parseInt(lessonDuration) || 0,
//         videoUrl: lessonType === 'video' ? lessonVideoUrl : undefined,
//         allowDownload: lessonAllowDownload,
//         attachments: [],
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       };
//       setLessons(prev => [...prev, newLesson]);
//     }

//     setIsLessonDialogOpen(false);
//     setHasChanges(true);
//   };

//   const handleDeleteLesson = () => {
//     if (deleteConfirmLesson) {
//       setLessons(prev => prev.filter(l => l.id !== deleteConfirmLesson.id));
//       setDeleteConfirmLesson(null);
//       setHasChanges(true);
//     }
//   };

//   if (!course) {
//     return (
//       <div className="flex h-96 items-center justify-center">
//         <p className="text-muted-foreground">Course not found</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Header */}
//       <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur">
//         <div className="flex h-16 items-center justify-between px-6">
//           <div className="flex items-center gap-4">
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => navigate('/instructor/dashboard')}
//             >
//               <ArrowLeft className="h-5 w-5" />
//             </Button>
//             <div>
//               <h1 className="font-semibold text-foreground">{course.title}</h1>
//               <p className="text-sm text-muted-foreground">
//                 {course.status === 'published' ? 'Published' : 'Draft'}
//               </p>
//             </div>
//           </div>

//           <div className="flex items-center gap-3">
//             {/* Publish Toggle */}
//             <div className="flex items-center gap-2">
//               <Label htmlFor="publish-toggle" className="text-sm">
//                 Publish
//               </Label>
//               <Switch
//                 id="publish-toggle"
//                 checked={course.status === 'published'}
//                 onCheckedChange={handleTogglePublish}
//               />
//             </div>

//             <Button variant="outline" size="sm">
//               <Eye className="mr-2 h-4 w-4" />
//               Preview
//             </Button>
//             <Button variant="outline" size="sm">
//               <Users className="mr-2 h-4 w-4" />
//               Add Attendees
//             </Button>
//             <Button variant="outline" size="sm">
//               <Mail className="mr-2 h-4 w-4" />
//               Contact
//             </Button>
//             <Button
//               variant="accent"
//               size="sm"
//               onClick={handleSave}
//               disabled={!hasChanges || isLoading}
//             >
//               <Save className="mr-2 h-4 w-4" />
//               Save
//             </Button>
//           </div>
//         </div>
//       </header>

//       {/* Content */}
//       <div className="container max-w-5xl py-8">
//         {/* Course Image */}
//         <div className="mb-8">
//           <Label>Course Image</Label>
//           <div className="mt-2 flex h-48 items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30 transition-colors hover:border-primary/50">
//             {course.image ? (
//               <div className="relative h-full w-full">
//                 <img
//                   src={course.image}
//                   alt="Course"
//                   className="h-full w-full rounded-xl object-cover"
//                 />
//                 <Button
//                   variant="secondary"
//                   size="sm"
//                   className="absolute right-3 top-3"
//                 >
//                   <ImageIcon className="mr-2 h-4 w-4" />
//                   Change
//                 </Button>
//               </div>
//             ) : (
//               <div className="text-center">
//                 <ImageIcon className="mx-auto h-10 w-10 text-muted-foreground" />
//                 <p className="mt-2 text-sm text-muted-foreground">
//                   Click to upload course image
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Course Fields */}
//         <div className="mb-8 grid gap-6 md:grid-cols-2">
//           <div className="space-y-2">
//             <Label htmlFor="title">
//               Title <span className="text-destructive">*</span>
//             </Label>
//             <Input
//               id="title"
//               value={course.title}
//               onChange={(e) => handleCourseChange('title', e.target.value)}
//               placeholder="Course title"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="website">
//               Website <span className="text-muted-foreground text-xs">(required for publish)</span>
//             </Label>
//             <Input
//               id="website"
//               value={course.website || ''}
//               onChange={(e) => handleCourseChange('website', e.target.value)}
//               placeholder="https://example.com/course"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="tags">Tags</Label>
//             <Input
//               id="tags"
//               value={course.tags.join(', ')}
//               onChange={(e) =>
//                 handleCourseChange(
//                   'tags',
//                   e.target.value.split(',').map((t) => t.trim()).filter(Boolean)
//                 )
//               }
//               placeholder="React, JavaScript, Frontend"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="admin">Course Admin</Label>
//             <Select value={course.adminId} onValueChange={(v) => handleCourseChange('adminId', v)}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select admin" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="user-1">Sarah Johnson</SelectItem>
//                 <SelectItem value="user-2">Michael Chen</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>

//         {/* Tabs */}
//         <Tabs value={activeTab} onValueChange={setActiveTab}>
//           <TabsList className="mb-6">
//             <TabsTrigger value="content">Content</TabsTrigger>
//             <TabsTrigger value="description">Description</TabsTrigger>
//             <TabsTrigger value="options">Options</TabsTrigger>
//             <TabsTrigger value="quiz">Quiz</TabsTrigger>
//           </TabsList>

//           {/* Content Tab - Lessons */}
//           <TabsContent value="content" className="space-y-4">
//             <div className="flex items-center justify-between">
//               <h2 className="text-lg font-semibold">Lessons</h2>
//               <Button variant="accent" size="sm" onClick={() => openLessonDialog()}>
//                 <Plus className="mr-2 h-4 w-4" />
//                 Add Content
//               </Button>
//             </div>

//             <div className="space-y-2">
//               {lessons.map((lesson, index) => {
//                 const Icon = lessonTypeIcons[lesson.type];
//                 return (
//                   <motion.div
//                     key={lesson.id}
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: index * 0.05 }}
//                     className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:shadow-sm"
//                   >
//                     <div className="cursor-grab opacity-0 transition-opacity group-hover:opacity-100">
//                       <GripVertical className="h-4 w-4 text-muted-foreground" />
//                     </div>
                    
//                     <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
//                       <Icon className="h-5 w-5 text-primary" />
//                     </div>

//                     <div className="flex-1 min-w-0">
//                       <p className="font-medium text-card-foreground truncate">
//                         {lesson.title}
//                       </p>
//                       <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                         <Badge variant="secondary" className="text-xs capitalize">
//                           {lesson.type}
//                         </Badge>
//                         {lesson.duration > 0 && (
//                           <span>{lesson.duration} min</span>
//                         )}
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
//                       <Button
//                         variant="ghost"
//                         size="icon-sm"
//                         onClick={() => openLessonDialog(lesson)}
//                       >
//                         <Edit className="h-4 w-4" />
//                       </Button>
//                       <Button
//                         variant="ghost"
//                         size="icon-sm"
//                         className="text-destructive hover:text-destructive"
//                         onClick={() => setDeleteConfirmLesson(lesson)}
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </motion.div>
//                 );
//               })}

//               {lessons.length === 0 && (
//                 <div className="flex h-48 flex-col items-center justify-center rounded-xl border-2 border-dashed border-border">
//                   <FileText className="h-10 w-10 text-muted-foreground/50" />
//                   <p className="mt-4 text-muted-foreground">No lessons yet</p>
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     className="mt-2"
//                     onClick={() => openLessonDialog()}
//                   >
//                     <Plus className="mr-2 h-4 w-4" />
//                     Add your first lesson
//                   </Button>
//                 </div>
//               )}
//             </div>
//           </TabsContent>

//           {/* Description Tab */}
//           <TabsContent value="description">
//             <div className="space-y-2">
//               <Label htmlFor="description">Course Description</Label>
//               <Textarea
//                 id="description"
//                 value={course.description}
//                 onChange={(e) => handleCourseChange('description', e.target.value)}
//                 placeholder="Describe your course..."
//                 className="min-h-[300px]"
//               />
//             </div>
//           </TabsContent>

//           {/* Options Tab */}
//           <TabsContent value="options" className="space-y-6">
//             <div className="rounded-xl border border-border p-6">
//               <h3 className="mb-4 font-semibold">Visibility</h3>
//               <Select
//                 value={course.visibility}
//                 onValueChange={(v) => handleCourseChange('visibility', v as CourseVisibility)}
//               >
//                 <SelectTrigger className="w-64">
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="everyone">Everyone</SelectItem>
//                   <SelectItem value="signed_in">Signed In Users Only</SelectItem>
//                 </SelectContent>
//               </Select>
//               <p className="mt-2 text-sm text-muted-foreground">
//                 {course.visibility === 'everyone'
//                   ? 'Anyone can view this course'
//                   : 'Only signed in users can view this course'}
//               </p>
//             </div>

//             <div className="rounded-xl border border-border p-6">
//               <h3 className="mb-4 font-semibold">Access Rule</h3>
//               <Select
//                 value={course.accessRule}
//                 onValueChange={(v) => handleCourseChange('accessRule', v as CourseAccessRule)}
//               >
//                 <SelectTrigger className="w-64">
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="open">Open</SelectItem>
//                   <SelectItem value="invitation">On Invitation</SelectItem>
//                   <SelectItem value="payment">On Payment</SelectItem>
//                 </SelectContent>
//               </Select>

//               {course.accessRule === 'payment' && (
//                 <div className="mt-4">
//                   <Label htmlFor="price">Price ($)</Label>
//                   <Input
//                     id="price"
//                     type="number"
//                     value={course.price || ''}
//                     onChange={(e) => handleCourseChange('price', parseFloat(e.target.value))}
//                     placeholder="49.99"
//                     className="mt-1 w-32"
//                   />
//                 </div>
//               )}
//             </div>
//           </TabsContent>

//           {/* Quiz Tab */}
//           <TabsContent value="quiz">
//             <div className="flex h-64 flex-col items-center justify-center rounded-xl border-2 border-dashed border-border">
//               <HelpCircle className="h-10 w-10 text-muted-foreground/50" />
//               <p className="mt-4 text-lg font-medium text-muted-foreground">Quiz Builder</p>
//               <p className="text-sm text-muted-foreground">Create quizzes to test learner knowledge</p>
//               <Button variant="accent" size="sm" className="mt-4">
//                 <Plus className="mr-2 h-4 w-4" />
//                 Create Quiz
//               </Button>
//             </div>
//           </TabsContent>
//         </Tabs>
//       </div>

//       {/* Lesson Editor Dialog */}
//       <Dialog open={isLessonDialogOpen} onOpenChange={setIsLessonDialogOpen}>
//         <DialogContent className="max-w-2xl">
//           <DialogHeader>
//             <DialogTitle>
//               {editingLesson ? 'Edit Lesson' : 'Add New Lesson'}
//             </DialogTitle>
//             <DialogDescription>
//               Configure the lesson content and settings
//             </DialogDescription>
//           </DialogHeader>

//           <Tabs defaultValue="content">
//             <TabsList className="mb-4">
//               <TabsTrigger value="content">Content</TabsTrigger>
//               <TabsTrigger value="description">Description</TabsTrigger>
//               <TabsTrigger value="attachments">Attachments</TabsTrigger>
//             </TabsList>

//             <TabsContent value="content" className="space-y-4">
//               <div className="space-y-2">
//                 <Label>Title</Label>
//                 <Input
//                   value={lessonTitle}
//                   onChange={(e) => setLessonTitle(e.target.value)}
//                   placeholder="Lesson title"
//                 />
//               </div>

//               <div className="grid gap-4 sm:grid-cols-2">
//                 <div className="space-y-2">
//                   <Label>Type</Label>
//                   <Select value={lessonType} onValueChange={(v) => setLessonType(v as LessonType)}>
//                     <SelectTrigger>
//                       <SelectValue />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="video">
//                         <span className="flex items-center gap-2">
//                           <Video className="h-4 w-4" /> Video
//                         </span>
//                       </SelectItem>
//                       <SelectItem value="document">
//                         <span className="flex items-center gap-2">
//                           <FileText className="h-4 w-4" /> Document
//                         </span>
//                       </SelectItem>
//                       <SelectItem value="image">
//                         <span className="flex items-center gap-2">
//                           <ImageType className="h-4 w-4" /> Image
//                         </span>
//                       </SelectItem>
//                       <SelectItem value="quiz">
//                         <span className="flex items-center gap-2">
//                           <HelpCircle className="h-4 w-4" /> Quiz
//                         </span>
//                       </SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div className="space-y-2">
//                   <Label>Duration (minutes)</Label>
//                   <Input
//                     type="number"
//                     value={lessonDuration}
//                     onChange={(e) => setLessonDuration(e.target.value)}
//                     placeholder="30"
//                   />
//                 </div>
//               </div>

//               {lessonType === 'video' && (
//                 <div className="space-y-2">
//                   <Label>Video URL</Label>
//                   <Input
//                     value={lessonVideoUrl}
//                     onChange={(e) => setLessonVideoUrl(e.target.value)}
//                     placeholder="https://youtube.com/watch?v=..."
//                   />
//                 </div>
//               )}

//               {(lessonType === 'document' || lessonType === 'image') && (
//                 <div className="space-y-2">
//                   <Label>Upload File</Label>
//                   <div className="flex h-24 items-center justify-center rounded-lg border-2 border-dashed border-border">
//                     <div className="text-center">
//                       <Upload className="mx-auto h-6 w-6 text-muted-foreground" />
//                       <p className="mt-1 text-sm text-muted-foreground">
//                         Click to upload or drag and drop
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {(lessonType === 'document' || lessonType === 'image') && (
//                 <div className="flex items-center gap-2">
//                   <Switch
//                     id="allow-download"
//                     checked={lessonAllowDownload}
//                     onCheckedChange={setLessonAllowDownload}
//                   />
//                   <Label htmlFor="allow-download">Allow download</Label>
//                 </div>
//               )}
//             </TabsContent>

//             <TabsContent value="description" className="space-y-4">
//               <div className="space-y-2">
//                 <Label>Lesson Description</Label>
//                 <Textarea
//                   value={lessonDescription}
//                   onChange={(e) => setLessonDescription(e.target.value)}
//                   placeholder="Describe this lesson..."
//                   className="min-h-[200px]"
//                 />
//               </div>
//             </TabsContent>

//             <TabsContent value="attachments" className="space-y-4">
//               <Button variant="outline" size="sm">
//                 <Upload className="mr-2 h-4 w-4" />
//                 Upload File
//               </Button>
//               <Button variant="outline" size="sm" className="ml-2">
//                 <LinkIcon className="mr-2 h-4 w-4" />
//                 Add Link
//               </Button>
              
//               <div className="rounded-lg border border-border p-8 text-center">
//                 <p className="text-sm text-muted-foreground">No attachments yet</p>
//               </div>
//             </TabsContent>
//           </Tabs>

//           <DialogFooter>
//             <Button variant="outline" onClick={() => setIsLessonDialogOpen(false)}>
//               Cancel
//             </Button>
//             <Button variant="accent" onClick={handleSaveLesson}>
//               {editingLesson ? 'Save Changes' : 'Add Lesson'}
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       {/* Delete Confirmation */}
//       <AlertDialog
//         open={!!deleteConfirmLesson}
//         onOpenChange={() => setDeleteConfirmLesson(null)}
//       >
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Delete Lesson</AlertDialogTitle>
//             <AlertDialogDescription>
//               Are you sure you want to delete "{deleteConfirmLesson?.title}"? This action cannot be undone.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel>Cancel</AlertDialogCancel>
//             <AlertDialogAction
//               onClick={handleDeleteLesson}
//               className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
//             >
//               Delete
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </div>
//   );
// }


// pages/instructor/course-editor.tsx














// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   ArrowLeft,
//   Save,
//   Eye,
//   Users,
//   Mail,
//   Plus,
//   Trash2,
//   Edit,
//   Upload,
//   Link as LinkIcon,
// } from 'lucide-react';
// import {
//   Course,
//   Lesson,
//   LessonType,
//   Attachment,
//   CourseVisibility,
//   CourseAccessRule,
//   Quiz,
// } from '@/types';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Label } from '@/components/ui/label';
// import { Switch } from '@/components/ui/switch';
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from '@/components/ui/tabs';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from '@/components/ui/dialog';
// import {
//   AlertDialog,
//   AlertDialogContent,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogAction,
//   AlertDialogCancel,
// } from '@/components/ui/alert-dialog';

// export function CourseEditor() {
//   const navigate = useNavigate();

//   // ---------------- Course State ----------------
//   const [course, setCourse] = useState<Course>({
//     id: 'course-1',
//     title: '',
//     description: '',
//     tags: [],
//     status: 'draft',
//     isPublished: false,
//     visibility: 'everyone',
//     accessRule: 'open',
//     adminId: '',
//     adminName: '',
//     lessons: [],
//     quizzes: [],
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   });

//   // ---------------- Lesson State ----------------
//   const [lessonDialogOpen, setLessonDialogOpen] = useState(false);
//   const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
//   const [attachments, setAttachments] = useState<Attachment[]>([]);

//   const emptyLesson: Lesson = {
//     id: '',
//     courseId: course.id,
//     title: '',
//     description: '',
//     type: 'video',
//     duration: 0,
//     allowDownload: false,
//     attachments: [],
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   };

//   const [lessonForm, setLessonForm] = useState<Lesson>(emptyLesson);

//   // ---------------- Handlers ----------------
//   const saveLesson = () => {
//     if (!lessonForm.title.trim()) return;

//     if (editingLesson) {
//       setCourse((c) => ({
//         ...c,
//         lessons: c.lessons.map((l) =>
//           l.id === editingLesson.id
//             ? { ...lessonForm, attachments }
//             : l
//         ),
//       }));
//     } else {
//       setCourse((c) => ({
//         ...c,
//         lessons: [
//           ...c.lessons,
//           {
//             ...lessonForm,
//             id: `lesson-${Date.now()}`,
//             attachments,
//           },
//         ],
//       }));
//     }

//     setLessonDialogOpen(false);
//     setEditingLesson(null);
//     setLessonForm(emptyLesson);
//     setAttachments([]);
//   };

//   const deleteLesson = (id: string) => {
//     setCourse((c) => ({
//       ...c,
//       lessons: c.lessons.filter((l) => l.id !== id),
//     }));
//   };

//   // ---------------- UI ----------------
//   return (
//     <div className="min-h-screen p-6">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <Button variant="ghost" onClick={() => navigate(-1)}>
//           <ArrowLeft className="mr-2 h-4 w-4" /> Back
//         </Button>

//         <div className="flex gap-2">
//           <Switch
//             checked={course.isPublished}
//             onCheckedChange={(v) =>
//               setCourse({ ...course, isPublished: v })
//             }
//           />
//           <Button variant="outline">
//             <Eye className="mr-2 h-4 w-4" /> Preview
//           </Button>
//           <Button variant="outline">
//             <Users className="mr-2 h-4 w-4" /> Add Attendees
//           </Button>
//           <Button variant="outline">
//             <Mail className="mr-2 h-4 w-4" /> Contact
//           </Button>
//           <Button>
//             <Save className="mr-2 h-4 w-4" /> Save
//           </Button>
//         </div>
//       </div>

//       {/* Course Fields */}
//       <div className="grid grid-cols-2 gap-4 mb-6">
//         <div>
//           <Label>Title *</Label>
//           <Input
//             value={course.title}
//             onChange={(e) =>
//               setCourse({ ...course, title: e.target.value })
//             }
//           />
//         </div>

//         <div>
//           <Label>Website</Label>
//           <Input
//             value={course.website || ''}
//             onChange={(e) =>
//               setCourse({ ...course, website: e.target.value })
//             }
//           />
//         </div>

//         <div>
//           <Label>Tags</Label>
//           <Input
//             value={course.tags.join(', ')}
//             onChange={(e) =>
//               setCourse({
//                 ...course,
//                 tags: e.target.value.split(',').map((t) => t.trim()),
//               })
//             }
//           />
//         </div>

//         <div>
//           <Label>Course Admin</Label>
//           <Select
//             onValueChange={(v) =>
//               setCourse({ ...course, adminId: v })
//             }
//           >
//             <SelectTrigger>
//               <SelectValue placeholder="Select admin" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="u1">Sarah Johnson</SelectItem>
//               <SelectItem value="u2">Michael Chen</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       {/* Tabs */}
//       <Tabs defaultValue="content">
//         <TabsList>
//           <TabsTrigger value="content">Content</TabsTrigger>
//           <TabsTrigger value="description">Description</TabsTrigger>
//           <TabsTrigger value="options">Options</TabsTrigger>
//           <TabsTrigger value="quiz">Quiz</TabsTrigger>
//         </TabsList>

//         {/* Content */}
//         <TabsContent value="content">
//           <Button
//             className="my-4"
//             onClick={() => setLessonDialogOpen(true)}
//           >
//             <Plus className="mr-2 h-4 w-4" /> Add Content
//           </Button>

//           {course.lessons.map((lesson) => (
//             <div
//               key={lesson.id}
//               className="flex justify-between border p-3 rounded mb-2"
//             >
//               <div>
//                 <strong>{lesson.title}</strong>
//                 <p className="text-sm text-muted-foreground capitalize">
//                   {lesson.type}
//                 </p>
//               </div>
//               <div className="flex gap-2">
//                 <Button
//                   size="sm"
//                   variant="ghost"
//                   onClick={() => {
//                     setEditingLesson(lesson);
//                     setLessonForm(lesson);
//                     setAttachments(lesson.attachments);
//                     setLessonDialogOpen(true);
//                   }}
//                 >
//                   <Edit className="h-4 w-4" />
//                 </Button>
//                 <Button
//                   size="sm"
//                   variant="ghost"
//                   className="text-destructive"
//                   onClick={() => deleteLesson(lesson.id)}
//                 >
//                   <Trash2 className="h-4 w-4" />
//                 </Button>
//               </div>
//             </div>
//           ))}
//         </TabsContent>

//         {/* Description */}
//         <TabsContent value="description">
//           <Textarea
//             value={course.description}
//             onChange={(e) =>
//               setCourse({ ...course, description: e.target.value })
//             }
//             className="min-h-[200px]"
//           />
//         </TabsContent>

//         {/* Options */}
//         <TabsContent value="options" className="space-y-4">
//           <Select
//             value={course.visibility}
//             onValueChange={(v) =>
//               setCourse({ ...course, visibility: v as CourseVisibility })
//             }
//           >
//             <SelectTrigger>
//               <SelectValue />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="everyone">Everyone</SelectItem>
//               <SelectItem value="signed_in">Signed In</SelectItem>
//             </SelectContent>
//           </Select>

//           <Select
//             value={course.accessRule}
//             onValueChange={(v) =>
//               setCourse({
//                 ...course,
//                 accessRule: v as CourseAccessRule,
//               })
//             }
//           >
//             <SelectTrigger>
//               <SelectValue />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="open">Open</SelectItem>
//               <SelectItem value="invitation">On Invitation</SelectItem>
//               <SelectItem value="payment">On Payment</SelectItem>
//             </SelectContent>
//           </Select>

//           {course.accessRule === 'payment' && (
//             <Input
//               type="number"
//               placeholder="Price"
//               onChange={(e) =>
//                 setCourse({
//                   ...course,
//                   price: Number(e.target.value),
//                 })
//               }
//             />
//           )}
//         </TabsContent>

//         {/* Quiz */}
//         <TabsContent value="quiz">
//           <Button
//             onClick={() =>
//               navigate(`/instructor/quiz-builder/${course.id}`)
//             }
//           >
//             <Plus className="mr-2 h-4 w-4" /> Add Quiz
//           </Button>

//           {course.quizzes.map((q: Quiz) => (
//             <div key={q.id} className="border p-3 rounded mt-2">
//               {q.title}
//             </div>
//           ))}
//         </TabsContent>
//       </Tabs>

//       {/* Lesson Dialog */}
//       <Dialog open={lessonDialogOpen} onOpenChange={setLessonDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Lesson</DialogTitle>
//           </DialogHeader>

//           <Input
//             placeholder="Lesson title"
//             value={lessonForm.title}
//             onChange={(e) =>
//               setLessonForm({ ...lessonForm, title: e.target.value })
//             }
//           />

//           <Select
//             value={lessonForm.type}
//             onValueChange={(v) =>
//               setLessonForm({ ...lessonForm, type: v as LessonType })
//             }
//           >
//             <SelectTrigger>
//               <SelectValue />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="video">Video</SelectItem>
//               <SelectItem value="document">Document</SelectItem>
//               <SelectItem value="image">Image</SelectItem>
//             </SelectContent>
//           </Select>

//           <Textarea
//             placeholder="Lesson description"
//             value={lessonForm.description}
//             onChange={(e) =>
//               setLessonForm({
//                 ...lessonForm,
//                 description: e.target.value,
//               })
//             }
//           />

//           <Button
//             variant="outline"
//             onClick={() =>
//               setAttachments((a) => [
//                 ...a,
//                 {
//                   id: `att-${Date.now()}`,
//                   name: 'External Link',
//                   url: 'https://example.com',
//                   type: 'link',
//                 },
//               ])
//             }
//           >
//             <LinkIcon className="mr-2 h-4 w-4" /> Add Link
//           </Button>

//           <DialogFooter>
//             <Button onClick={saveLesson}>Save Lesson</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }


// pages/instructor/course-editor.tsx














// correct 
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  Eye,
  Users,
  Mail,
  Plus,
  Trash2,
  Edit,
} from 'lucide-react';
import {
  Course,
  Lesson,
  LessonType,
  CourseVisibility,
  CourseAccessRule,
  Quiz,
  QuizQuestion,
} from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

export function CourseEditor() {
  const navigate = useNavigate();

  // ---------------- Course ----------------
  const [course, setCourse] = useState<Course>({
    id: 'course-1',
    title: '',
    description: '',
    tags: [],
    status: 'draft',
    isPublished: false,
    visibility: 'everyone',
    accessRule: 'open',
    lessons: [],
    quizzes: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  // ---------------- Lesson (TEXT CRUD) ----------------
  const [lessonDialogOpen, setLessonDialogOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [lessonForm, setLessonForm] = useState<Lesson>({
    id: '',
    courseId: course.id,
    title: '',
    description: '',
    type: 'document',
    allowDownload: false,
    attachments: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  // ---------------- Quiz ----------------
  const [quizDialogOpen, setQuizDialogOpen] = useState(false);
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  // ---------------- Email Wizards ----------------
  const [addWizardOpen, setAddWizardOpen] = useState(false);
  const [contactWizardOpen, setContactWizardOpen] = useState(false);
  const [emails, setEmails] = useState<string[]>([]);
  const [emailInput, setEmailInput] = useState('');
  const [emailRole, setEmailRole] = useState('Learner');

  const [template, setTemplate] = useState('Meeting Invite');
  const [message, setMessage] = useState('');

  // ---------------- Handlers ----------------
  const handlePublishToggle = (value: boolean) => {
    setCourse({
      ...course,
      isPublished: value,
      status: value ? 'published' : 'draft',
    });
  };

  const handlePreview = () => {
    window.open(`/learner/course/${course.id}`, '_blank');
  };

  const saveLesson = () => {
    if (!lessonForm.title.trim()) return;

    if (editingLesson) {
      setCourse((c) => ({
        ...c,
        lessons: c.lessons.map((l) =>
          l.id === editingLesson.id ? lessonForm : l
        ),
      }));
    } else {
      setCourse((c) => ({
        ...c,
        lessons: [
          ...c.lessons,
          { ...lessonForm, id: `lesson-${Date.now()}` },
        ],
      }));
    }

    setLessonDialogOpen(false);
    setEditingLesson(null);
  };

  const deleteLesson = (id: string) => {
    setCourse((c) => ({
      ...c,
      lessons: c.lessons.filter((l) => l.id !== id),
    }));
  };

  const addEmailChip = () => {
    if (!emailInput.includes('@')) return;
    setEmails([...emails, emailInput]);
    setEmailInput('');
  };

  const addQuestion = () => {
    if (questions.length >= 10) return;
    setQuestions([
      ...questions,
      {
        id: `q-${Date.now()}`,
        question: '',
        options: [
          { id: 'o1', text: '', isCorrect: false },
          { id: 'o2', text: '', isCorrect: false },
        ],
      },
    ]);
  };

  const saveQuiz = () => {
    if (!quizTitle.trim()) return;

    const quiz: Quiz = {
      id: `quiz-${Date.now()}`,
      courseId: course.id,
      title: quizTitle,
      questions,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setCourse((c) => ({ ...c, quizzes: [...c.quizzes, quiz] }));
    setQuizDialogOpen(false);
    setQuizTitle('');
    setQuestions([]);
  };

  // ---------------- UI ----------------
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between mb-6">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <div className="flex items-center gap-2">
          <Switch
            checked={course.isPublished}
            onCheckedChange={handlePublishToggle}
          />
          <Badge variant={course.isPublished ? 'default' : 'secondary'}>
            {course.isPublished ? 'Published' : 'Draft'}
          </Badge>

          <Button variant="outline" onClick={handlePreview}>
            <Eye className="mr-2 h-4 w-4" /> Preview
          </Button>

          <Button variant="outline" onClick={() => setAddWizardOpen(true)}>
            <Users className="mr-2 h-4 w-4" /> Add Attendees
          </Button>

          <Button variant="outline" onClick={() => setContactWizardOpen(true)}>
            <Mail className="mr-2 h-4 w-4" /> Contact
          </Button>

          <Button>
            <Save className="mr-2 h-4 w-4" /> Save
          </Button>
        </div>
      </div>

      {/* Content */}
      <Tabs defaultValue="content">
        <TabsList>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="options">Options</TabsTrigger>
          <TabsTrigger value="quiz">Quiz</TabsTrigger>
        </TabsList>

        {/* CONTENT – TEXT LESSON CRUD */}
        <TabsContent value="content">
          <Button onClick={() => setLessonDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Text Lesson
          </Button>

          {course.lessons.map((lesson) => (
            <div key={lesson.id} className="border p-3 mt-2 flex justify-between">
              <div>
                <strong>{lesson.title}</strong>
                <p className="text-sm text-muted-foreground">Text Lesson</p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setEditingLesson(lesson);
                    setLessonForm(lesson);
                    setLessonDialogOpen(true);
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-destructive"
                  onClick={() => deleteLesson(lesson.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </TabsContent>

        {/* DESCRIPTION */}
        <TabsContent value="description">
          <Textarea
            value={course.description}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
            className="min-h-[200px]"
          />
        </TabsContent>

        {/* OPTIONS */}
        <TabsContent value="options" className="space-y-4">
          <Select
            value={course.visibility}
            onValueChange={(v) =>
              setCourse({ ...course, visibility: v as CourseVisibility })
            }
          >
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="everyone">Everyone</SelectItem>
              <SelectItem value="signed_in">Signed In</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={course.accessRule}
            onValueChange={(v) =>
              setCourse({ ...course, accessRule: v as CourseAccessRule })
            }
          >
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="invitation">On Invitation</SelectItem>
              <SelectItem value="payment">On Payment</SelectItem>
            </SelectContent>
          </Select>
        </TabsContent>

        {/* QUIZ */}
        <TabsContent value="quiz">
          <Button onClick={() => setQuizDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Quiz
          </Button>
        </TabsContent>
      </Tabs>

      {/* ADD ATTENDEES WIZARD */}
      <Dialog open={addWizardOpen} onOpenChange={setAddWizardOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Attendees</DialogTitle>
          </DialogHeader>

          <Input
            placeholder="Enter email and press Add"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
          />
          <Button onClick={addEmailChip}>Add</Button>

          <div className="flex gap-2 flex-wrap">
            {emails.map((e) => (
              <Badge key={e}>{e}</Badge>
            ))}
          </div>

          <Select value={emailRole} onValueChange={setEmailRole}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Learner">Learner</SelectItem>
              <SelectItem value="Guest">Guest</SelectItem>
            </SelectContent>
          </Select>

          <DialogFooter>
            <Button onClick={() => setAddWizardOpen(false)}>
              Confirm & Send Invite
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* CONTACT ATTENDEES WIZARD */}
      <Dialog open={contactWizardOpen} onOpenChange={setContactWizardOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contact Attendees</DialogTitle>
          </DialogHeader>

          <Select value={template} onValueChange={setTemplate}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Meeting Invite">Meeting Invite</SelectItem>
              <SelectItem value="Reminder">Reminder</SelectItem>
              <SelectItem value="Follow-up">Follow-up</SelectItem>
            </SelectContent>
          </Select>

          <Textarea
            placeholder="Write message... Use {{name}}"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <DialogFooter>
            <Button onClick={() => setContactWizardOpen(false)}>
              Preview & Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
